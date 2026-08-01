<script setup lang="ts">
import { t } from '../i18n'

// 밖으로 내놓는 주소는 TabStick·Edgetree와 같은 것을 쓴다. 앱마다 다르면
// 답장이 어디로 갔는지 사람이 기억해야 한다.
const EMAIL = 'pjh85336@gmail.com'
</script>

<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="brand">
          <img src="/logo.png" alt="" width="20" height="20" />
          <span>LunchTea</span>
        </div>

        <a class="contact" :href="`mailto:${EMAIL}`">{{ t.footer.contact }}: {{ EMAIL }}</a>
      </div>

      <!-- 상호 링크는 푸터에 한 줄로만. 받으러 온 사람을 위쪽에서 다른 데로
           보내지 않는다. -->
      <p class="other">
        {{ t.footer.otherTool }} ·
        <a href="https://tabstick.com/" target="_blank" rel="noopener">TabStick</a> ·
        <a href="https://edgetree.vercel.app/" target="_blank" rel="noopener">Edgetree</a>
      </p>

      <!-- 담아서 함께 배포하는 것들의 고지. 셋 다 배포할 때 표기를 요구한다 —
           지켜야 해서 적는 것이지 읽히려고 적는 것이 아니라, 저작권 줄과 같은
           무게로 낮춰 둔다. -->
      <p class="credits">
        {{ t.footer.credits }}:
        <a href="https://github.com/MonoGame/MonoGame" target="_blank" rel="noopener">MonoGame</a>
        (Ms-PL) ·
        <a href="https://www.libsdl.org/" target="_blank" rel="noopener">SDL2</a>
        (zlib) ·
        <a href="https://openal-soft.org/" target="_blank" rel="noopener">OpenAL Soft</a>
        (LGPL 2.1) ·
        <a href="https://github.com/JetBrains/JetBrainsMono" target="_blank" rel="noopener">JetBrains Mono</a>
        (SIL OFL 1.1)
      </p>

      <p class="copyright">{{ t.footer.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 30px 0 44px;
  background: var(--bg-alt);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--text-strong);
  font-weight: 600;
}

.contact {
  font-size: 13.5px;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.contact:hover {
  color: var(--text-strong);
  border-bottom-color: var(--accent);
}

.other {
  font-size: 13.5px;
}

.other a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.other a:hover {
  color: var(--text-strong);
  border-bottom-color: var(--accent);
}

.credits,
.copyright {
  margin-top: 10px;
  font-size: 12px;
  color: #5b6377;
}

.credits a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted #454d5e;
}

.credits a:hover {
  color: var(--text);
}

@media (max-width: 560px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
