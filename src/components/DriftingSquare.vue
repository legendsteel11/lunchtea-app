<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 화면을 떠도는 네모들.
 *
 * 이 앱의 적이 전부 네모라, 페이지에도 몇 마리 풀어 둔다. <b>읽는 것을
 * 방해하지 않는 것이 조건이다</b> — 클릭을 가로채지 않고(<c>pointer-events</c>),
 * 머리띠 아래로 지나가고(z-index), 옅게 둔다.
 *
 * <b>움직임을 싫어하는 설정이면 아예 안 띄운다</b>(<c>prefers-reduced-motion</c>).
 * 멈춰 세운 네모가 화면 한구석에 박혀 있는 것은 장식이 아니라 얼룩이다.
 */
const host = ref<HTMLElement | null>(null)

/**
 * 떠도는 것들.
 *
 * <b>둘을 다르게 둔다.</b> 크기·색·속도가 같으면 한 마리가 둘로 복사된 것으로
 * 보여서, 화면에 <b>같은 것이 두 번</b> 있는 꼴이 된다. 다르면 각자 제 볼일을
 * 보는 것으로 읽힌다.
 *
 * <b>큰 쪽이 더 옅고 느리다.</b> 면적이 넓은 만큼 같은 진하기여도 눈에 더
 * 걸리고, 빠르기까지 하면 글을 읽는 동안 자꾸 시선을 끌어간다.
 */
const SQUARES = [
  { size: 16, speed: 46, color: 'var(--toy-4)', glow: 'rgba(110, 170, 240, 0.5)', alpha: 0.55 },
  { size: 23, speed: 33, color: 'var(--toy-5)', glow: 'rgba(190, 140, 230, 0.4)', alpha: 0.38 },
]

type Drifter = {
  x: number
  y: number
  vx: number
  vy: number
  spin: number
  angle: number

  /** 다가가기가 끝나는 시각(초). 지금이 이보다 작으면 다가가는 중이다. */
  until: number

  /** 다음에 다가갈지 말지를 정하는 시각(초). */
  nextRoll: number
}

/**
 * 가끔 커서 쪽으로 다가간다.
 *
 * <b>늘 따라오면 커서에 붙은 장식이 된다.</b> 어디로 가든 따라붙는 것은
 * 마우스 자취와 다를 것이 없어서, 몇 번 움직여 보면 규칙이 다 보인다.
 * 가끔이어야 <b>제 볼일을 보다 한 번씩 기웃거리는 것</b>이 된다.
 *
 * <b>다가가는 동안 오히려 느려진다.</b> 빠르게 달려들면 쫓아오는 것이 되고,
 * 읽던 사람은 피해야 할 것으로 본다.
 */
const APPROACH = {
  /** 다가갈지 정하는 간격(초). 이 사이에서 하나 뽑는다. */
  waitMin: 9,
  waitMax: 24,

  /** 한 번 다가가면 이만큼 붙는다(초). */
  timeMin: 2.6,
  timeMax: 4.6,

  /** 다가가는 동안의 속도. 평소의 몇 배인지. */
  speed: 0.55,

  /** 방향을 트는 빠르기(rad/s). 크면 꺾이는 것이 눈에 보인다. */
  turn: 1.0,

  /** 이만큼 가까워지면 그만둔다(px). 커서 위에 올라타면 가리는 것이 된다. */
  stop: 74,
}

type Drifters = Drifter[]

let frame = 0
let last = 0

const drifters: Drifters = []
let boxes: HTMLElement[] = []

/** 커서 자리. 아직 한 번도 안 움직였으면 다가가지 않는다. */
let pointerX = 0
let pointerY = 0
let pointerSeen = false

/** 지금 다가가는 중인 네모. <b>한 번에 하나만</b> — 둘이 함께 오면 몰려오는 것이 된다. */
let approaching = -1

function onPointerMove(e: PointerEvent) {
  pointerX = e.clientX
  pointerY = e.clientY
  pointerSeen = true
}

function onPointerOut(e: PointerEvent) {
  // 창 밖으로 나간 것만 본다. 페이지 안 요소 사이를 오갈 때도 이 이벤트가 온다.
  if (e.relatedTarget !== null) return

  pointerSeen = false

  if (approaching >= 0) {
    drifters[approaching].until = 0
    approaching = -1
  }
}

/** 다가가기를 끝내고 원래 속도로 되돌린다. 방향은 가던 쪽 그대로 둔다. */
function release(d: Drifter, speed: number) {
  const heading = Math.atan2(d.vy, d.vx)

  d.vx = Math.cos(heading) * speed
  d.vy = Math.sin(heading) * speed
  d.until = 0
}

function step(now: number) {
  frame = requestAnimationFrame(step)

  const dt = Math.min(0.05, (now - last) / 1000)
  const seconds = now / 1000
  last = now

  for (let i = 0; i < drifters.length; i++) {
    const d = drifters[i]
    const square = SQUARES[i]

    // 화면 크기가 바뀌면 밖으로 나갈 수 있으므로 매 프레임 가둔다.
    const w = window.innerWidth - square.size
    const h = window.innerHeight - square.size

    if (seconds >= d.nextRoll) {
      d.nextRoll = seconds + APPROACH.waitMin + Math.random() * (APPROACH.waitMax - APPROACH.waitMin)

      if (pointerSeen && approaching < 0) {
        d.until = seconds + APPROACH.timeMin + Math.random() * (APPROACH.timeMax - APPROACH.timeMin)
        approaching = i
      }
    }

    if (seconds < d.until) {
      const cx = d.x + square.size / 2
      const cy = d.y + square.size / 2
      const dx = pointerX - cx
      const dy = pointerY - cy

      if (Math.hypot(dx, dy) <= APPROACH.stop) {
        // 다 왔다. 시간을 다 쓰지 않고 그만두고 하던 대로 떠난다.
        release(d, square.speed)
        approaching = -1
      } else {
        // 가던 방향을 목표 쪽으로 <b>조금씩 튼다.</b> 속도를 곧장 목표
        // 방향으로 갈아 끼우면 그 프레임에 꺾여서, 떠돌던 것이 갑자기
        // 겨냥한 것으로 보인다.
        const heading = Math.atan2(d.vy, d.vx)
        const wanted = Math.atan2(dy, dx)

        // 두 각의 차를 -π~π로 되돌린다. 안 그러면 359°를 도는 쪽으로 튼다.
        const diff = Math.atan2(Math.sin(wanted - heading), Math.cos(wanted - heading))
        const turned = heading + Math.max(-APPROACH.turn * dt, Math.min(APPROACH.turn * dt, diff))
        const speed = square.speed * APPROACH.speed

        d.vx = Math.cos(turned) * speed
        d.vy = Math.sin(turned) * speed
      }
    } else if (d.until > 0) {
      release(d, square.speed)
      approaching = -1
    }

    d.x += d.vx * dt
    d.y += d.vy * dt
    d.angle += d.spin * dt

    // 벽에 닿으면 튕긴다. 자리를 함께 되밀지 않으면 벽에 붙어 부르르 떤다.
    if (d.x <= 0 || d.x >= w) {
      d.vx = -d.vx
      d.x = Math.min(Math.max(d.x, 0), w)
      d.spin = -d.spin
    }

    if (d.y <= 0 || d.y >= h) {
      d.vy = -d.vy
      d.y = Math.min(Math.max(d.y, 0), h)
      d.spin = -d.spin
    }

    const el = boxes[i]
    if (el) el.style.transform = `translate(${d.x}px, ${d.y}px) rotate(${d.angle}rad)`
  }
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  boxes = Array.from(host.value?.children ?? []) as HTMLElement[]

  const now = performance.now() / 1000

  for (const square of SQUARES) {
    const w = Math.max(0, window.innerWidth - square.size)
    const h = Math.max(0, window.innerHeight - square.size)

    // 곧게 가로세로로만 가면 화면을 반듯하게 왕복해서 <b>애니메이션</b>으로
    // 보인다. 비스듬히 두면 같은 자리를 두 번 지나지 않아 떠도는 것이 된다.
    const dir = Math.random() * Math.PI * 2

    drifters.push({
      x: w * (0.2 + Math.random() * 0.6),
      y: h * (0.3 + Math.random() * 0.4),
      vx: Math.cos(dir) * square.speed,
      vy: Math.sin(dir) * square.speed,
      spin: (Math.random() - 0.5) * 0.9,
      angle: Math.random() * Math.PI,
      until: 0,

      // 처음 한 번은 <b>넉넉히 늦게</b> 굴린다. 페이지에 들어오자마자 다가오면
      // 그것이 이 네모가 하는 일인 줄 알게 되고, 그러면 가끔이 아니게 된다.
      nextRoll: now + APPROACH.waitMin + Math.random() * APPROACH.waitMax,
    })
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerout', onPointerOut, { passive: true })

  last = performance.now()
  frame = requestAnimationFrame(step)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerout', onPointerOut)
})
</script>

<template>
  <!-- 자리는 감싸는 쪽이 잡고, 네모는 그 안에서 <c>transform</c>만 받는다.
       각자에게 <c>position: fixed</c>를 주면 첫 프레임 자리가 저마다 왼쪽 위
       구석이라, 뜨는 순간 구석에 겹쳐 있는 것이 보인다. -->
  <div ref="host" class="drift-host" aria-hidden="true">
    <div
      v-for="(square, i) in SQUARES"
      :key="i"
      class="drift"
      :style="{
        width: `${square.size}px`,
        height: `${square.size}px`,
        background: square.color,
        boxShadow: `0 0 14px ${square.glow}`,
        '--drift-alpha': square.alpha,
        animationDelay: `${i * 0.25}s`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.drift-host {
  position: fixed;
  inset: 0;

  /* 머리띠(z-index 10) 아래로 지나간다 — 위로 지나가면 메뉴를 가리는 순간이
     생기고, 그때 이 네모가 <b>고장난 것</b>처럼 보인다. */
  z-index: 5;
  pointer-events: none;
}

.drift {
  position: absolute;
  top: 0;
  left: 0;

  /* 모서리를 안 굴린다. 게임 안의 적이 각진 네모라, 여기서만 굴리면
     <b>다른 데서 온 것</b>이 된다. */

  opacity: var(--drift-alpha);

  /* 처음 한 프레임은 왼쪽 위 구석에 있다. transform이 들어오기 전에 보이면
     구석에서 튀어나오는 것처럼 보이므로 잠깐 숨겼다 뜬다. */
  animation: drift-in 0.6s ease-out both;
}

@keyframes drift-in {
  from {
    opacity: 0;
  }
  to {
    opacity: var(--drift-alpha);
  }
}
</style>
