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
        <!-- 채워진 칸은 <b>화면을 그대로 깐다.</b> 이름 앞에 세우던 "CF"는
             뺐다 — 그것은 그림이 없을 때 자리를 지키던 글자라, 화면이 들어온
             자리에 남으면 그림 위에 이름표가 두 개 겹친 꼴이 된다. -->
        <div class="slot filled">
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
  padding-top: 24px;
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

  /* 모서리를 안 굴린다. 히어로의 화면과 같은 줄에 서는 네모라, 저 위는
     각지고 여기만 둥글면 <b>다른 데서 온 것</b>으로 보인다. */

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

/* 채워진 칸에는 놀이판 한 장이 깔린다. 칸이 정사각형이고 놀이판도
   정사각형이라 <c>cover</c>로 잘려 나가는 데가 없다. */
.slot.filled {
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  border: 1px solid var(--border);
  background: #090c12 url('/screenshots/cf-mini.png') center / cover no-repeat;
}

/* 이름이 놓이는 아래쪽만 어둡게 깐다. 화면이 밤하늘이라 대개는 그냥
   읽히지만, 밝은 성운이나 적이 그 자리에 걸리는 순간 이름이 사라진다.
   판 전체를 덮으면 화면을 깐 뜻이 없어지므로 아래만 덮는다. */
.slot.filled::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 58%;
  background: linear-gradient(to top, rgba(9, 12, 18, 0.92), rgba(9, 12, 18, 0));
}

/* 이름은 <b>물러나 있는다.</b> 이 칸에서 보여 줄 것은 화면이고 이름은 그것이
   무엇인지 확인하는 자리라, 흰 글씨로 세우면 그림 위에 이름이 얹혀 그림을
   가린다. 빈 칸들(#4d566a)보다는 밝게 둔다 — 채워진 칸이라는 것은 여전히
   구분돼야 한다. */
.slot.filled .label {
  position: relative;
  z-index: 1;
  padding-bottom: 9px;
  color: var(--text);
}
</style>
