import { Injectable, signal, effect, WritableSignal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeFacade {
  private document: Document = inject(DOCUMENT);
  private readonly storageKey = 'theme-mode';
  mode: WritableSignal<ThemeMode> = signal<ThemeMode>(this.load());

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.applyWithFade(mode);
      localStorage.setItem(this.storageKey, mode);
    });

    // Si estás en system y el OS cambia en caliente
    const mq = globalThis.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', () => {
      if (this.mode() === 'system') this.applyWithFade('system');
    });
  }

  setMode(mode: ThemeMode) {
    this.mode.set(mode);
  }

  private applyWithFade(mode: ThemeMode) {
    const overlay = this.document.getElementById('theme-fade');

    // Si no existe overlay (o SSR) aplica directo
    if (!overlay) {
      this.applyTheme(mode);
      return;
    }

    // Respeta prefers-reduced-motion
    const reduceMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion) {
      this.applyTheme(mode);
      return;
    }

    // 1) Fade OUT (tapar)
    overlay.classList.add('on');

    // 2) Cambia el tema cuando el overlay ya empezó a cubrir
    globalThis.setTimeout(() => {
      this.applyTheme(mode);

      // 3) Fade IN (destapar)
      // Un frame extra ayuda a que el navegador recompute estilos antes de quitar overlay
      requestAnimationFrame(() => {
        overlay.classList.remove('on');
      });
    }, 180);
  }

  private applyTheme(mode: ThemeMode) {
    const html = this.document.documentElement;
    if (mode === 'system') {
      delete html.dataset["theme"]; // Deja que el OS decida
      return;
    }
    html.dataset["theme"] = mode; // light | dark
  }

  private load(): ThemeMode {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;
    return saved ?? 'system';
  }
}
