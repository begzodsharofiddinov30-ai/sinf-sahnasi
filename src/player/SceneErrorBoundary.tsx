// Bitta sahna buzilsa ham dars davom etadi
import { Component, type ReactNode } from 'react';

export class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed)
      return (
        <div className="grid h-full place-items-center p-8 text-center">
          <p className="text-lead font-extrabold text-ink">Bu sahnani ko‘rsatib bo‘lmadi. Keyingisiga o‘ting.</p>
        </div>
      );
    return this.props.children;
  }
}
