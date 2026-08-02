<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'

/**
 * <b>주소를 문자열로 묶어 넘긴다.</b> 템플릿에 <c>src="/..."</c>로 곧장 적으면 Vite가
 * 그것을 빌드 때 챙길 파일로 보고 찾다가, 없으면 <b>빌드가 실패한다</b>. 이 그림은
 * 나중에 갈아 끼울 수 있으므로 그러면 안 된다 — 묶어서 넘기면 그냥 주소로 지나간다.
 */
/**
 * 형식은 mp4 <b>하나만</b> 둔다.
 *
 * webm을 함께 두고 <c>&lt;source&gt;</c>로 고르게 하는 것이 흔한 방법이지만, 여기서는
 * 재 봤더니 이득이 없었다 — 같은 화질로 맞췄을 때 VP9가 H.264보다 <b>오히려 컸다</b>
 * (1.08MB 대 1.05MB). 어두운 밤하늘 그라데이션이 많아서 그런 것으로 보인다. 이득이
 * 없으면 파일 두 벌은 그냥 관리할 것이 하나 더 느는 것이다.
 */
const clip = '/screenshots/hero.mp4'
const poster = '/screenshots/hero-poster.jpg'

/**
 * 히어로 자리가 무엇을 보여 줄지. 영상 → 스틸 → 네모 순으로 <b>한 칸씩 내려간다.</b>
 *
 * <b>이 자리를 비워 두지 않는다.</b> 페이지에서 제일 큰 자리라, 비면 화면 한가운데가
 * 뚫린 것으로 보인다. 그래서 파일이 없거나 코덱을 못 읽으면 그냥 실패하는 대신
 * 포스터 한 장으로 내려가고, 그것마저 없으면 놀이판을 흉내 낸 네모가 선다.
 *
 * 움직임을 줄여 달라고 해 둔 사람에게는 처음부터 스틸로 시작한다 — 28초짜리가
 * 끝없이 도는 것은 <b>멈출 수 없는 애니메이션</b>이고, 그 설정이 막으려는 것이 바로
 * 그것이다.
 */
type Stage = 'clip' | 'still' | 'none'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const stage = ref<Stage>(reduced ? 'still' : 'clip')

function stepDown() {
  stage.value = stage.value === 'clip' ? 'still' : 'none'
}
</script>

<template>
  <section id="top" class="hero">
    <div class="container inner">
      <p class="eyebrow">{{ t.hero.eyebrow }}</p>

      <h1>
        <img class="logo" src="/logo.png" alt="" width="56" height="56" />
        <span>{{ t.hero.title }}</span>
      </h1>

      <p class="tagline">{{ t.hero.tagline }}</p>

      <!-- 위쪽 다운로드 단추와 "Windows 10 · 11" 줄은 뺐다(2026-08-01).
           받는 자리는 아래에 제대로 있고, 여기 있던 것은 <b>거기로 데려가는
           단추</b>였다 — 한 화면에 다 들어오는 길이의 페이지에서 같은 곳을
           가리키는 문이 둘이면 하나는 길 안내가 아니라 소음이다.
           요구 사양도 받기 직전에 읽는 것이라 아래에 붙어 있어야 한다.
           위쪽 메뉴의 "다운로드"는 그대로 둔다 — 스크롤을 내리는 중에도
           늘 보이는 자리라 성격이 다르다. -->

      <figure class="shot">
        <!-- 소리가 없는 영상이다(오디오 트랙 자체가 없다). 그래도 muted를 적는다 —
             브라우저는 트랙 유무를 보는 것이 아니라 이 표시를 보고 자동 재생을
             허락한다. playsinline이 없으면 iOS가 전체 화면으로 띄워 버린다. -->
        <video
          v-if="stage === 'clip'"
          :src="clip"
          :poster="poster"
          :aria-label="t.hero.shot"
          autoplay
          muted
          loop
          playsinline
          @error="stepDown"
        ></video>
        <img
          v-else-if="stage === 'still'"
          :src="poster"
          :alt="t.hero.shot"
          @error="stepDown"
        />
        <div v-else class="placeholder" aria-hidden="true">
          <span class="dot" v-for="n in 5" :key="n"></span>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
/* 아래 여백이 <b>0이다.</b> 바로 밑 토이 칸 줄이 <c>--gap-tile</c>만큼만
   띄우고 붙어 서므로, 여기서 한 번 더 띄우면 그만큼 더해져 벌어진다.
   틈은 아래쪽 한 곳에서만 준다. */
.hero {
  padding-top: 40px;
  padding-bottom: 0;
}

.inner {
  text-align: center;
}

.eyebrow {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
  font-size: clamp(38px, 7vw, 60px);
  line-height: 1.1;
}

/* 로고는 글자 크기를 따라간다. px로 박아 두면 좁은 화면에서 이름만 줄고
   그림은 그대로라 둘이 따로 논다. */
.logo {
  width: clamp(42px, 7.4vw, 64px);
  height: auto;
  filter: drop-shadow(0 0 14px rgba(110, 168, 255, 0.3));
}

.tagline {
  margin: 18px auto 28px;
  max-width: 34em;
  font-size: 17px;
}

.note {
  margin-top: 12px;
  font-size: 13px;
}

.shot {
  margin: 30px auto 0;

  /* 원본이 720×480이다. 이보다 넓히면 늘려 그리는 것이라 글자부터 흐려진다 —
     여기 찍힌 것은 코드 편집기와 파일 목록이라 흐려지면 바로 티가 난다. */
  width: min(720px, 100%);
}

.shot video,
.shot img,
.placeholder {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;

  /* 모서리를 안 굴린다. 이 그림은 <b>화면을 통째로 찍은 것</b>이라, 굴리면
     화면이 아니라 카드로 보인다 — 실제로는 네모난 모니터 안이다. */
  border: 1px solid var(--border);
  background: #090c12;
  object-fit: cover;

  /* 화면이 밤하늘이라 그림자만으로는 안 떠 보인다. 옅은 파란 빛을 둘러
     띄운다 — 게임 안의 기체가 남기는 자취와 같은 색이다. */
  box-shadow: 0 0 0 1px rgba(110, 168, 255, 0.08), 0 24px 60px rgba(0, 0, 0, 0.55);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.placeholder .dot {
  width: 26px;
  height: 26px;
  border-radius: 5px;
  opacity: 0.5;
}

.placeholder .dot:nth-child(1) { background: var(--toy-1); }
.placeholder .dot:nth-child(2) { background: var(--toy-2); }
.placeholder .dot:nth-child(3) { background: var(--toy-3); }
.placeholder .dot:nth-child(4) { background: var(--toy-4); }
.placeholder .dot:nth-child(5) { background: var(--toy-5); }
</style>
