<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <!-- 다운로드 <b>아래</b>다. 받을지 정하는 자리에서는 지금 있는 것만 보이고,
       이 두 줄은 이미 마음이 기운 사람이 읽는다. -->
  <section id="notice">
    <div class="container">
      <div class="note card">
        <h2>{{ t.notice.title }}</h2>
        <p v-for="line in t.notice.items" :key="line">{{ line }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.note {
  max-width: var(--panel);
  margin: 0 auto;
  padding: 26px 28px;
  text-align: center;

  /* 카드지만 테두리를 점선으로 둔다. 실선이면 앞의 다운로드 상자와 같은
     무게가 되어 <b>또 하나의 할 일</b>처럼 보인다. */
  border-style: dashed;
  background: transparent;
}

h2 {
  font-size: 15px;
  color: var(--text);
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

p {
  font-size: 14.5px;
  line-height: 1.9;
}
</style>
