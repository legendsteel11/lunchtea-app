<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'

/**
 * 히어로 그림이 아직 없을 수도 있다.
 *
 * <b>없을 때 자리를 비워 두지 않는다.</b> 이 그림이 이 페이지에서 제일 큰 자리라,
 * 비면 화면 한가운데가 뚫린 것으로 보인다. 파일이 들어오면 그대로 그림이 되고,
 * 없으면 놀이판을 흉내 낸 네모가 대신 선다 — <c>public/screenshots/hero.gif</c>에
 * 넣으면 코드는 손댈 것이 없다.
 */
const missing = ref(false)

/**
 * <b>주소를 문자열로 묶어 넘긴다.</b> 템플릿에 <c>src="/..."</c>로 곧장 적으면 Vite가
 * 그것을 빌드 때 챙길 파일로 보고 찾다가, 없으면 <b>빌드가 실패한다</b>. 이 그림은
 * 나중에 들어올 수 있으므로 그러면 안 된다 — 묶어서 넘기면 그냥 주소로 지나간다.
 */
const shot = '/screenshots/hero.gif'
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

      <a class="btn btn-primary" href="#download">{{ t.hero.cta }}</a>
      <p class="note">{{ t.hero.ctaNote }}</p>

      <figure class="shot">
        <img
          v-if="!missing"
          :src="shot"
          :alt="t.hero.shot"
          @error="missing = true"
        />
        <div v-else class="placeholder" aria-hidden="true">
          <span class="dot" v-for="n in 5" :key="n"></span>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 56px;
  padding-bottom: 24px;
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
  margin: 40px auto 0;

  /* 놀이판이 정사각형이라 그림도 정사각형에 가깝다. 폭을 넓게 두면
     양옆이 남아서 <b>가운데 작은 그림</b>이 된다. */
  width: min(560px, 100%);
}

.shot img,
.placeholder {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
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
