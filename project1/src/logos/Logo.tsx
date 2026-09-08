/**
 * Logo — цветной SVG логотипа бренда «как есть» (фирменные заливки сохраняются).
 *
 *   <Logo name="react" size={120} />
 *
 * Данные — из `registry.ts` (генерится `npm run sync-icons`).
 */

import { LOGO_REGISTRY, type LogoName } from "./registry";

export type { LogoName };

export interface LogoProps {
  name: LogoName;
  /** Высота бокса в px; ширина — по соотношению viewBox */
  size?: number;
}

export const Logo = ({ name, size = 96 }: LogoProps) => {
  const entry = LOGO_REGISTRY[name];
  const [, , vbW, vbH] = entry.viewBox.split(/\s+/).map(Number);
  const width = vbH ? (size * vbW) / vbH : size;

  return (
    <svg
      viewBox={entry.viewBox}
      width={width}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={name}
      dangerouslySetInnerHTML={{ __html: entry.markup }}
    />
  );
};
