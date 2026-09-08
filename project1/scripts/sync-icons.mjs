/**
 * sync-icons — вендоринг SVG иконок и логотипов в репозиторий.
 *
 *   npm run sync-icons
 *
 * Вход:  src/icons/wanted.json  { "logos": [...], "icons": [...] }
 * Выход:
 *   src/logos/svg/<name>.svg   — сырой ЦВЕТНОЙ SVG логотипа (фирменные заливки как есть)
 *   src/logos/registry.ts      — LOGO_REGISTRY: Record<name, { viewBox, markup }>
 *   src/icons/svg/<name>.svg    — сырой МОНО SVG иконки (Lucide, stroke=currentColor)
 *   src/icons/registry.ts       — ICON_REGISTRY: Record<name, { viewBox, markup }>
 *
 * Источники:
 *   logos — сначала `devicon` (devDep), вариант `<name>-original.svg`
 *           (фолбэк `<name>-original-wordmark.svg`);
 *           если нет — fetch gilbarbara/logos: https://cdn.svgporn.com/logos/<slug>.svg
 *   icons — `lucide-static` (devDep): node_modules/lucide-static/icons/<name>.svg
 *
 * Идемпотентно и детерминированно: один и тот же wanted.json → один и тот же вывод.
 * Оба пакета — ТОЛЬКО devDependencies, в рантайм не тянутся (компоненты читают registry.ts).
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const WANTED = join(ROOT, "src/icons/wanted.json");
const DEVICON_DIR = join(ROOT, "node_modules/devicon/icons");
const LUCIDE_DIR = join(ROOT, "node_modules/lucide-static/icons");

/** Имя из wanted.json → slug в gilbarbara/logos (svgporn), если отличается. */
const SVGPORN_SLUG = {
  githubcopilot: "github-copilot",
};

// ---------------------------------------------------------------------------
// SVG parsing
// ---------------------------------------------------------------------------

/** Убрать XML-пролог, DOCTYPE, комментарии. */
const stripPreamble = (svg) =>
  svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

/** { viewBox, markup } из строки SVG. markup — внутренность <svg>…</svg>. */
const parseSvg = (raw) => {
  const svg = stripPreamble(raw);
  const open = svg.match(/<svg\b([^>]*)>/i);
  if (!open) throw new Error("нет <svg>");
  const attrs = open[1];

  let viewBox = (attrs.match(/viewBox\s*=\s*["']([^"']+)["']/i) || [])[1];
  if (!viewBox) {
    const w = (attrs.match(/\bwidth\s*=\s*["']?([\d.]+)/i) || [])[1];
    const h = (attrs.match(/\bheight\s*=\s*["']?([\d.]+)/i) || [])[1];
    if (w && h) viewBox = `0 0 ${w} ${h}`;
    else viewBox = "0 0 24 24";
  }

  const inner = svg
    .slice(open.index + open[0].length)
    .replace(/<\/svg>\s*$/i, "")
    .trim()
    // нормализуем пробелы между тегами — детерминированный вывод
    .replace(/>\s+</g, "><")
    .trim();

  return { viewBox, markup: inner };
};

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

const readIfExists = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** Логотип: devicon → svgporn. Возвращает { svg, source }. */
const fetchLogo = async (name) => {
  const original = readIfExists(join(DEVICON_DIR, name, `${name}-original.svg`));
  if (original) return { svg: original, source: `devicon:${name}-original` };

  const wordmark = readIfExists(join(DEVICON_DIR, name, `${name}-original-wordmark.svg`));
  if (wordmark) return { svg: wordmark, source: `devicon:${name}-original-wordmark` };

  const slug = SVGPORN_SLUG[name] || name;
  const url = `https://cdn.svgporn.com/logos/${slug}.svg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`svgporn ${slug}: HTTP ${res.status}`);
  return { svg: await res.text(), source: `svgporn:${slug}` };
};

/** Иконка: только lucide-static. */
const fetchIcon = (name) => {
  const svg = readIfExists(join(LUCIDE_DIR, `${name}.svg`));
  if (!svg) throw new Error(`lucide-static: нет ${name}.svg`);
  return { svg, source: `lucide-static:${name}` };
};

// ---------------------------------------------------------------------------
// Codegen
// ---------------------------------------------------------------------------

const writeFile = (rel, content) => {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
};

const renderRegistry = (constName, typeName, entries) => {
  const body = entries
    .map(
      ([name, { viewBox, markup }]) =>
        `  ${JSON.stringify(name)}: { viewBox: ${JSON.stringify(viewBox)}, markup: ${JSON.stringify(markup)} },`
    )
    .join("\n");
  return (
    `/**\n` +
    ` * СГЕНЕРИРОВАНО \`npm run sync-icons\` — не редактировать вручную.\n` +
    ` * Источник имён: src/icons/wanted.json. Сырые SVG — в соседней папке svg/.\n` +
    ` */\n\n` +
    `export const ${constName} = {\n` +
    `${body}\n` +
    `} satisfies Record<string, { viewBox: string; markup: string }>;\n\n` +
    `export type ${typeName} = keyof typeof ${constName};\n`
  );
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const run = async () => {
  const wanted = JSON.parse(readFileSync(WANTED, "utf8"));
  const logos = wanted.logos ?? [];
  const icons = wanted.icons ?? [];

  const log = { logos: [], icons: [], missing: [] };

  // чистим папки svg/ — вывод строго = wanted.json
  rmSync(join(ROOT, "src/logos/svg"), { recursive: true, force: true });
  rmSync(join(ROOT, "src/icons/svg"), { recursive: true, force: true });

  // ── logos ──────────────────────────────────────────────────────────────
  const logoEntries = [];
  for (const name of logos) {
    try {
      const { svg, source } = await fetchLogo(name);
      writeFile(`src/logos/svg/${name}.svg`, svg.trim() + "\n");
      logoEntries.push([name, parseSvg(svg)]);
      log.logos.push(`${name} ← ${source}`);
    } catch (e) {
      log.missing.push(`logo ${name}: ${e.message}`);
    }
  }
  writeFile("src/logos/registry.ts", renderRegistry("LOGO_REGISTRY", "LogoName", logoEntries));

  // ── icons ──────────────────────────────────────────────────────────────
  const iconEntries = [];
  for (const name of icons) {
    try {
      const { svg, source } = fetchIcon(name);
      writeFile(`src/icons/svg/${name}.svg`, svg.trim() + "\n");
      iconEntries.push([name, parseSvg(svg)]);
      log.icons.push(`${name} ← ${source}`);
    } catch (e) {
      log.missing.push(`icon ${name}: ${e.message}`);
    }
  }
  writeFile("src/icons/registry.ts", renderRegistry("ICON_REGISTRY", "IconName", iconEntries));

  // ── отчёт ──────────────────────────────────────────────────────────────
  console.log(`\nlogos (${log.logos.length}/${logos.length}):`);
  log.logos.forEach((l) => console.log(`  ${l}`));
  console.log(`\nicons (${log.icons.length}/${icons.length}):`);
  log.icons.forEach((l) => console.log(`  ${l}`));
  if (log.missing.length) {
    console.log(`\nНЕ НАЙДЕНО (${log.missing.length}):`);
    log.missing.forEach((m) => console.log(`  ${m}`));
    process.exitCode = 1;
  } else {
    console.log(`\nвсё на месте.`);
  }
};

run();
