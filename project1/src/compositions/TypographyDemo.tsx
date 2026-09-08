/**
 * Demo-композиция типографики (дизайн-манифест, about.md §3–§4).
 * Матрица 4 роли (h1 / h2 / body / small) × 3 цвета (black / white / gray),
 * показанная на обоих режимах кадра: верхняя половина — `paper` (белый фон),
 * нижняя — `ink` (чёрный фон). Статично, без анимации.
 */

import { AbsoluteFill, Composition } from "remotion";
import { text, color, video, type TextRole } from "../common";

const ROLES: TextRole[] = ["h1", "h2", "body", "small"];

const SAMPLE: Record<TextRole, string> = {
  h1: "Код",
  h2: "Меньше кода",
  body: "Короткий абзац основного текста — читается в обоих режимах кадра.",
  small: "ВЫПУСК 07 · MOTION",
  // старые роли в демо не показываем, но тип требует все ключи
  display: "Код",
  heading: "Код",
  subheading: "Меньше кода",
  title: "Метка секции",
  caption: "подпись",
};

const COLUMNS: { key: "black" | "white" | "gray"; label: string; value: string }[] = [
  { key: "black", label: "color.black", value: color.black },
  { key: "white", label: "color.white", value: color.white },
  { key: "gray", label: "color.gray", value: color.gray },
];

const Half = ({ mode }: { mode: "paper" | "ink" }) => {
  const bg = mode === "paper" ? color.white : color.black;
  const meta = mode === "paper" ? color.black : color.white;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: bg,
        padding: `${video.height * 0.045}px 72px`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...text.small,
          color: color.gray,
          textTransform: "uppercase",
        }}
      >
        {`режим ${mode} · фон ${mode === "paper" ? "color.white" : "color.black"}`}
      </div>

      {/* Шапка колонок */}
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", gap: 24, alignItems: "end" }}>
        <div />
        {COLUMNS.map((c) => (
          <div key={c.key} style={{ ...text.small, color: meta, opacity: 0.6 }}>
            {c.label}
          </div>
        ))}
      </div>

      {/* Строки ролей */}
      {ROLES.map((role) => (
        <div
          key={role}
          style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr 1fr 1fr",
            gap: 24,
            alignItems: "baseline",
            borderTop: `1px solid ${meta}`,
            paddingTop: 20,
          }}
        >
          <div style={{ ...text.small, color: meta, opacity: 0.6 }}>{`text.${role}`}</div>
          {COLUMNS.map((c) => (
            <div key={c.key} style={{ ...text[role], color: c.value }}>
              {SAMPLE[role]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const TypographyDemoScene = () => (
  <AbsoluteFill style={{ flexDirection: "column" }}>
    <Half mode="paper" />
    <Half mode="ink" />
  </AbsoluteFill>
);

export const TypographyDemo = () => (
  <Composition
    id="TypographyDemo"
    component={TypographyDemoScene}
    durationInFrames={150}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
