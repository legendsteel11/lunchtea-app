<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="about">
    <div class="container">
      <!-- 여섯 칸을 읽기 전에 <b>이게 무엇인지</b> 한 줄로 먼저 준다. 카드부터
           나오면 각 칸은 읽히는데 전체가 뭔지는 끝까지 안 잡힌다. -->
      <div class="section-heading">
        <h2>{{ t.about.title }}</h2>
        <p>{{ t.about.lead }}</p>
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

  /* 제목이 왼쪽 띠와 <b>같은 색</b>이다. 띠만 색이면 그것은 카드를 세는
     눈금이지만, 제목까지 같은 색이면 그 칸 하나가 제 색을 가진 것이 된다. */
  color: var(--card-accent);
}

.item p {
  font-size: 14.5px;
}

/* 카드마다 왼쪽에 색 한 줄. 적 색표를 차례로 돌려 쓴다 — 여섯 칸이 전부
   같은 회색이면 읽을 것이 많은 벽으로 보인다.

   <b>색은 칸마다 한 번만 정한다.</b> 띠와 제목이 각자 색을 들고 있으면
   나중에 한쪽만 고쳤을 때 그 칸에서 둘이 어긋난다. */
.item {
  border-left: 3px solid var(--card-accent);
}

.grid .item { --card-accent: var(--border); }
.grid .item:nth-child(6n + 1) { --card-accent: var(--toy-1); }
.grid .item:nth-child(6n + 2) { --card-accent: var(--toy-2); }
.grid .item:nth-child(6n + 3) { --card-accent: var(--toy-3); }
.grid .item:nth-child(6n + 4) { --card-accent: var(--toy-4); }
.grid .item:nth-child(6n + 5) { --card-accent: var(--toy-5); }
.grid .item:nth-child(6n + 6) { --card-accent: var(--toy-6); }
</style>
