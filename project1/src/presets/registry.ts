/**
 * Реестр пресетов — словарь всех доступных компонентов.
 * Чтобы добавить новый пресет: написать компонент → добавить одну строку сюда.
 * SceneFrame берёт компоненты отсюда по строковому имени из манифеста.
 */

import React from "react";

import { BlurReveal }    from "./BlurReveal";
import { CounterDuo }    from "./CounterDuo";
import { DocumentList }  from "./DocumentList";
import { GridScene }     from "./GridScene";
import { HeroBadge }     from "./HeroBadge";
import { HookScene }     from "./HookScene";
import { SlideInList }   from "./SlideInList";
import { TextTypewriter } from "./TextTypewriter";

export const REGISTRY = {
  BlurReveal,
  CounterDuo,
  DocumentList,
  GridScene,
  HeroBadge,
  HookScene,
  SlideInList,
  TextTypewriter,
} as const satisfies Record<string, React.ComponentType<any>>;

export type PresetName = keyof typeof REGISTRY;
