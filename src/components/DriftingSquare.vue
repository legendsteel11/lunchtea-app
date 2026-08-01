<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 화면을 떠도는 네모 하나.
 *
 * 이 앱의 적이 전부 네모라, 페이지에도 한 마리만 풀어 둔다. <b>읽는 것을
 * 방해하지 않는 것이 조건이다</b> — 클릭을 가로채지 않고(<c>pointer-events</c>),
 * 머리띠 아래로 지나가고(z-index), 옅게 둔다.
 *
 * <b>움직임을 싫어하는 설정이면 아예 안 띄운다</b>(<c>prefers-reduced-motion</c>).
 * 멈춰 세운 네모가 화면 한구석에 박혀 있는 것은 장식이 아니라 얼룩이다.
 */
const box = ref<HTMLElement | null>(null)

const SIZE = 16
const SPEED = 46 // px/s

let frame = 0
let last = 0

// 자리와 속도. 화면 크기가 바뀌면 밖으로 나갈 수 있으므로 매 프레임 가둔다.
let x = 0
let y = 0
let vx = 0
let vy = 0
let spin = 0
let angle = 0

function step(now: number) {
  frame = requestAnimationFrame(step)

  const dt = Math.min(0.05, (now - last) / 1000)
  last = now

  const w = window.innerWidth - SIZE
  const h = window.innerHeight - SIZE

  x += vx * dt
  y += vy * dt
  angle += spin * dt

  // 벽에 닿으면 튕긴다. 자리를 함께 되밀지 않으면 벽에 붙어 부르르 떤다.
  if (x <= 0 || x >= w) {
    vx = -vx
    x = Math.min(Math.max(x, 0), w)
    spin = -spin
  }

  if (y <= 0 || y >= h) {
    vy = -vy
    y = Math.min(Math.max(y, 0), h)
    spin = -spin
  }

  const el = box.value
  if (el) el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const w = Math.max(0, window.innerWidth - SIZE)
  const h = Math.max(0, window.innerHeight - SIZE)

  x = w * (0.2 + Math.random() * 0.6)
  y = h * (0.3 + Math.random() * 0.4)

  // 곧게 가로세로로만 가면 화면을 반듯하게 왕복해서 <b>애니메이션</b>으로
  // 보인다. 비스듬히 두면 같은 자리를 두 번 지나지 않아 떠도는 것이 된다.
  const dir = Math.random() * Math.PI * 2
  vx = Math.cos(dir) * SPEED
  vy = Math.sin(dir) * SPEED
  spin = (Math.random() - 0.5) * 0.9

  last = performance.now()
  frame = requestAnimationFrame(step)
})

onUnmounted(() => cancelAnimationFrame(frame))
</script>

<template>
  <div ref="box" class="drift" aria-hidden="true"></div>
</template>

<style scoped>
.drift {
  position: fixed;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 3px;

  /* 머리띠(z-index 10) 아래로 지나간다 — 위로 지나가면 메뉴를 가리는 순간이
     생기고, 그때 이 네모가 <b>고장난 것</b>처럼 보인다. */
  z-index: 5;
  pointer-events: none;

  background: var(--toy-4);
  opacity: 0.55;
  box-shadow: 0 0 14px rgba(110, 170, 240, 0.5);

  /* 처음 한 프레임은 왼쪽 위 구석에 있다. transform이 들어오기 전에 보이면
     구석에서 튀어나오는 것처럼 보이므로 잠깐 숨겼다 뜬다. */
  animation: drift-in 0.6s ease-out both;
}

@keyframes drift-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.55;
  }
}
</style>
