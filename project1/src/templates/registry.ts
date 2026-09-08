/**
 * Реестр сцен-шаблонов — словарь шаблонов, доступных в манифесте по имени.
 *
 * Шаблон отличается от пресета (`src/presets/`) тем, что задаёт целую сцену
 * из типографики/зон по дизайн-манифесту, а не отдельный визуальный блок.
 *
 * SceneFrame резолвит имя из манифеста по объединению TEMPLATE_REGISTRY ∪ REGISTRY
 * (шаблоны в приоритете при совпадении имён).
 */

import React from "react";

import { SequentialReveal } from "./SequentialReveal";

export const TEMPLATE_REGISTRY = {
  SequentialReveal,
} as const satisfies Record<string, React.ComponentType<any>>;

export type TemplateName = keyof typeof TEMPLATE_REGISTRY;
