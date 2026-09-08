/**
 * Icon — моно SVG-иконка Lucide, наследует цвет от `color` родителя
 * (`stroke="currentColor"`).
 *
 *   <Icon name="terminal" size={48} strokeWidth={2} />
 *
 * Данные — из `registry.ts` (генерится `npm run sync-icons`).
 */

import { ICON_REGISTRY, type IconName } from "./registry";

export type { IconName };

export interface IconProps {
  name: IconName;
  /** Сторона бокса в px */
  size?: number;
  strokeWidth?: number;
}

export const Icon = ({ name, size = 48, strokeWidth = 2 }: IconProps) => {
  const entry = ICON_REGISTRY[name];

  return (
    <svg
      viewBox={entry.viewBox}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={name}
      dangerouslySetInnerHTML={{ __html: entry.markup }}
    />
  );
};
