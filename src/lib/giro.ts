/**
 * Um único laço de animação gira todos os rótulos de disco da página.
 * Velocidade base de 33⅓ rpm (200°/s); rolar a página "arranha" o disco.
 */
const alvos = new Set<HTMLElement>();
let rodando = false;
let angulo = 0;
let ultimoT = 0;
let ultimoY = 0;
let fator = 1;

function quadro(t: number) {
  const dt = Math.min(t - ultimoT, 50);
  ultimoT = t;
  const y = window.scrollY;
  angulo = (angulo + 0.2 * dt * fator + (y - ultimoY) * 0.35) % 360;
  ultimoY = y;
  for (const el of alvos) el.style.transform = `rotate(${angulo}deg)`;
  if (alvos.size) requestAnimationFrame(quadro);
  else rodando = false;
}

export function registrarGiro(el: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  alvos.add(el);
  if (!rodando) {
    rodando = true;
    ultimoT = performance.now();
    ultimoY = window.scrollY;
    requestAnimationFrame(quadro);
  }
  return () => {
    alvos.delete(el);
  };
}

/** Modo turbo: 78 rpm em vez de 33⅓. */
export function definirTurbo(ligado: boolean) {
  fator = ligado ? 78 / 33.33 : 1;
}
