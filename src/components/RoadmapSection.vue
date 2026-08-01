<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="roadmap">
    <div class="container">
      <div class="section-heading">
        <h2>{{ t.roadmap.title }}</h2>
        <p>{{ t.roadmap.desc }}</p>
      </div>

      <!-- 다운로드 <b>아래</b>에 둔다. 받을지 정하는 자리에서는 지금 있는 것만
           보이고, 앞으로의 이야기는 이미 마음이 기운 사람이 읽는다. -->
      <ul class="list">
        <li v-for="item in t.roadmap.items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.list {
  max-width: 620px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.list li {
  position: relative;
  padding: 12px 16px 12px 34px;
  border-radius: 10px;
  border: 1px dashed var(--border);
  font-size: 14.5px;
}

/* 앞에 빈 네모. 채워진 네모로 두면 <b>다 된 목록</b>처럼 보인다. */
.list li::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 18px;
  width: 9px;
  height: 9px;
  border-radius: 2px;
  border: 1px solid #3d465a;
}
</style>
