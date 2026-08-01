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

        <!-- 첫 줄에 세운다. 목록 가운데에 끼워 두고 밝기만 올리면 <b>왜 저것만
             밝은지</b>가 안 읽혀서 강조가 아니라 어긋남으로 보인다. -->
        <p class="highlight">{{ t.notice.highlight }}</p>

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

/* <b>밝기로만 세운다.</b> 굵게 하거나 더 키우면 경고문이 되고, 그러면 받기
   직전에 망설일 이유를 주는 자리가 된다. 여기서 할 일은 <b>지금 어디쯤인지</b>를
   먼저 눈에 들어오게 하는 것까지다. */
.highlight {
  margin-bottom: 10px;
  padding-bottom: 12px;
  font-size: 15.5px;
  color: var(--text-strong);

  /* 아래 두 줄과 갈라 두는 선. 점선 테두리와 같은 색이라 이 카드 안에서
     새로 생긴 선으로 보이지 않는다. */
  border-bottom: 1px solid var(--border);
}
</style>
