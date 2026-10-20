import type { Scene } from '../content/schema';

export interface SceneProps<S extends Scene = Scene> {
  scene: S;
  /** Joriy qadam (0 dan) */
  step: number;
  /** O'qituvchi javobni ochganmi */
  revealed: boolean;
  /** Keyingi qadam/sahnaga o'tish */
  onNext: () => void;
}
