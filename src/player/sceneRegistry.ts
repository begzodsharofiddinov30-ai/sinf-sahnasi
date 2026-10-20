// Sahna turlari ro'yxati: yangi tur qo'shish uchun shu yerga yozing
import type { ComponentType } from 'react';
import type { Scene, SceneType } from '../content/schema';
import type { SceneProps } from './sceneProps';
import { BuildWordScene } from './scenes/BuildWordScene';
import { ChooseAnswerScene } from './scenes/ChooseAnswerScene';
import { ClockScene } from './scenes/ClockScene';
import { CountAndTapScene } from './scenes/CountAndTapScene';
import { DragMatchScene } from './scenes/DragMatchScene';
import { ExplainScene } from './scenes/ExplainScene';
import { NumberLineScene } from './scenes/NumberLineScene';
import { RecapScene } from './scenes/RecapScene';
import { SortGroupsScene } from './scenes/SortGroupsScene';
import { StoryScene } from './scenes/StoryScene';
import { TenFrameScene } from './scenes/TenFrameScene';

interface SceneEntry<S extends Scene> {
  component: ComponentType<SceneProps<S>>;
  /** Sahna ichidagi "Keyingi" bosishlar soni */
  steps: (scene: S) => number;
}

type Registry = { [K in SceneType]: SceneEntry<Extract<Scene, { type: K }>> };

const one = () => 1;

export const sceneRegistry: Registry = {
  explain: { component: ExplainScene, steps: (s) => s.steps.length },
  'count-and-tap': { component: CountAndTapScene, steps: one },
  'choose-answer': { component: ChooseAnswerScene, steps: one },
  'drag-match': { component: DragMatchScene, steps: one },
  'build-word': { component: BuildWordScene, steps: one },
  'sort-groups': { component: SortGroupsScene, steps: one },
  'number-line': { component: NumberLineScene, steps: one },
  'ten-frame': { component: TenFrameScene, steps: one },
  clock: { component: ClockScene, steps: one },
  story: { component: StoryScene, steps: (s) => s.pages.length },
  recap: { component: RecapScene, steps: (s) => s.points.length },
};

export function getSceneEntry(scene: Scene): SceneEntry<Scene> | undefined {
  return sceneRegistry[scene.type] as SceneEntry<Scene> | undefined;
}

export function sceneStepCount(scene: Scene): number {
  return Math.max(1, getSceneEntry(scene)?.steps(scene) ?? 1);
}
