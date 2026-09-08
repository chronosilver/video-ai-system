/**
 * Типы манифеста видео.
 *
 * SceneManifestEntry — дискриминантный union: для каждого ключа K из REGISTRY
 * одна запись в union имеет { preset: K, duration: number, data: PropsOf<REGISTRY[K]> }.
 *
 * Это значит: написал `preset: "SlideInList"` — TypeScript требует правильный
 * `data` (SlideInListProps). Ошибка в данных → ошибка компиляции в манифесте.
 *
 * ─── ЧТО ОСТАЛОСЬ ДЛЯ ПОЛНОЙ ТИПОБЕЗОПАСНОСТИ ───────────────────────────────
 *
 * В SceneFrame.tsx в строке рендера есть приведение `entry.data as any`.
 * Убрать его без потери типов невозможно по архитектурной причине TypeScript:
 * массив манифеста гомогенен — тип элемента это union всех записей. Внутри
 * `.map()` TypeScript не сужает K по значению `entry.preset` автоматически,
 * поэтому `REGISTRY[entry.preset]` имеет тип `ComponentType<any>` (ширина union).
 *
 * Два пути устранить это в будущем:
 *
 * (a) Паттерн "correlated union" через generics:
 *     Вынести рендер одной сцены в generic-функцию `renderScene<K extends PresetName>`,
 *     которая принимает `SceneManifestEntryFor<K>`. TypeScript сможет сузить K внутри.
 *     Но тогда нельзя использовать `.map()` напрямую — нужен type-guard или
 *     вспомогательная overloaded функция.
 *
 * (b) Codegen-подход:
 *     Генератор создаёт switch-statement по всем ключам REGISTRY. Каждая ветка
 *     полностью типобезопасна. Код громоздкий, но TypeScript доволен.
 *
 * Пока `as any` изолирован в одной строке SceneFrame.tsx — это приемлемо.
 * Типобезопасность работает там где важнее: в файле манифеста при его написании.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { REGISTRY } from "../presets/registry";

type RegistryKey = keyof typeof REGISTRY;

type SceneManifestEntryFor<K extends RegistryKey> = {
  preset:   K;
  duration: number;
  data:     React.ComponentPropsWithoutRef<typeof REGISTRY[K]>;
};

/** Полный дискриминантный union по всем зарегистрированным пресетам */
export type SceneManifestEntry = {
  [K in RegistryKey]: SceneManifestEntryFor<K>;
}[RegistryKey];
