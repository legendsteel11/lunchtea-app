<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section class="soon">
    <div class="container">
      <!-- 제목을 뺐다. 빈 칸 셋이 이미 <b>아직 셋이 남았다</b>고 말하고
           있어서, 위에 같은 말을 글로 한 번 더 적으면 설명이 된다. -->
      <div class="slots">
        <!-- 첫 칸만 채워져 있다. 나머지 셋이 비어 있는 것이 이 줄의 전부다 —
             "하나 나왔고 셋이 남았다"를 글로 쓰지 않고 자리로 말한다. -->
        <div class="slot filled">
          <span class="face">CF</span>
          <span class="label">Cursor Fighter</span>
        </div>

        <div class="slot" v-for="n in 3" :key="n">
          <span class="face">?</span>
          <span class="label">{{ t.soon.soon }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.soon {
  padding-top: 40px;
}

.slots {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  max-width: 640px;
  margin: 0 auto;
}

@media (max-width: 560px) {
  .slots {
    grid-template-columns: repeat(2, 1fr);
  }
}

.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  /* 빈 칸은 점선이다. 실선으로 두면 <b>비어 있는 카드</b>가 되어 만들다 만
     것처럼 보이는데, 점선은 자리를 잡아 둔 것으로 읽힌다. */
  border: 1px dashed var(--border);
  background: rgba(255, 255, 255, 0.015);
}

.slot .face {
  font-size: 22px;
  font-weight: 700;
  color: #3d465a;
}

.slot .label {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: #4d566a;
}

.slot.filled {
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.slot.filled .face {
  color: var(--accent);
}

.slot.filled .label {
  color: var(--text);
}
</style>
