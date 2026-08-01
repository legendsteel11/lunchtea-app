<script setup lang="ts">
import { t, toggleLang } from '../i18n'
</script>

<template>
  <header>
    <div class="container bar">
      <a class="brand" href="#top">
        <img class="mark" src="/logo.png" alt="" width="24" height="24" />
        <span class="name">LunchTea</span>
      </a>

      <nav>
        <a href="#about">{{ t.nav.about }}</a>
        <a href="#play">{{ t.nav.play }}</a>
        <a class="cta" href="#download">{{ t.nav.download }}</a>
      </nav>

      <button class="lang" type="button" @click="toggleLang">{{ t.langButton }}</button>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;

  /* 반투명 위에 흐림. 별 배경이 머리띠 뒤로 지나가는 것이 보여야 <b>같은 하늘</b>로
     읽힌다 — 꽉 막으면 페이지 위에 딴 판이 얹힌 것처럼 보인다. */
  background: rgba(13, 16, 23, 0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.bar {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 56px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  font-weight: 700;
  color: var(--text-strong);
  letter-spacing: -0.01em;
}

.mark {
  width: 24px;
  height: 24px;

  /* 어두운 판 위에 파란 로고라 가장자리가 배경에 묻는다. 아주 옅은 빛을
     둘러 띄운다 — 테두리를 그리면 아이콘에 상자를 씌운 꼴이 된다. */
  filter: drop-shadow(0 0 6px rgba(110, 168, 255, 0.35));
}

nav {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-left: auto;
  font-size: 14px;
}

nav a {
  text-decoration: none;
  transition: color 0.15s ease;
}

nav a:hover {
  color: var(--text-strong);
}

nav .cta {
  color: var(--accent);
  font-weight: 600;
}

.lang {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 7px;
  padding: 5px 11px;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.lang:hover {
  border-color: var(--accent);
  color: var(--text-strong);
}

/* 좁은 화면에서는 메뉴를 접고 다운로드만 남긴다. 세 줄 메뉴를 만들 만큼
   항목이 많지 않다 — 남길 하나가 분명하면 그것만 두는 편이 낫다. */
@media (max-width: 640px) {
  nav a:not(.cta) {
    display: none;
  }
}
</style>
