<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="about">
    <div class="container">
      <div class="section-heading">
        <h2>{{ t.about.title }}</h2>
      </div>

      <div class="grid">
        <article class="card item" v-for="item in t.about.items" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.item {
  padding: 22px 22px 24px;
}

.item h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.item p {
  font-size: 14.5px;
}

/* 카드마다 왼쪽에 색 한 줄. 적 색표를 차례로 돌려 쓴다 — 여섯 칸이 전부
   같은 회색이면 읽을 것이 많은 벽으로 보인다. */
.item {
  border-left: 3px solid var(--border);
}

.grid .item:nth-child(6n + 1) { border-left-color: var(--toy-1); }
.grid .item:nth-child(6n + 2) { border-left-color: var(--toy-2); }
.grid .item:nth-child(6n + 3) { border-left-color: var(--toy-3); }
.grid .item:nth-child(6n + 4) { border-left-color: var(--toy-4); }
.grid .item:nth-child(6n + 5) { border-left-color: var(--toy-5); }
.grid .item:nth-child(6n + 6) { border-left-color: var(--accent); }
</style>
