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
        <div class="slot">
          <div class="box filled"></div>
          <span class="label named">Cursor Fighter</span>
        </div>

        <div class="slot" v-for="n in 3" :key="n">
          <div class="box"><span class="face">?</span></div>
          <span class="label">{{ t.soon.soon }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 위 화면에 <b>바짝 붙는다.</b> 칸 넷 사이의 틈과 같은 값이라, 화면 한 장이
   이 줄의 다섯째 칸처럼 같은 격자 위에 놓인 것으로 읽힌다. */
.soon {
  padding-top: var(--gap-tile);
}

/* 히어로의 화면과 <b>같은 폭</b>이다(720px). 이 줄은 저 위 화면 바로 아래에
   서므로, 폭이 어긋나면 두 덩이가 서로 다른 판에서 온 것으로 보인다.
   가운데 정렬로 얼추 맞추는 것과 변이 딱 맞는 것은 눈에 다르게 들어온다. */
.slots {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-tile);
  max-width: 720px;
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
  gap: 9px;
}

/* 이름은 <b>칸 밖 아래</b>에 선다. 그림 위에 얹으면 이름을 읽히게 하려고
   아래쪽을 어둡게 덮어야 하는데, 그 덮개가 가리는 것이 하필 화면에서 제일
   붐비는 자리다. 밖으로 내보내면 그림은 한 장이 통째로 남고 이름은 이름대로
   또렷해진다. */
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;

  /* 모서리를 안 굴린다. 히어로의 화면과 같은 줄에 서는 네모라, 저 위는
     각지고 여기만 둥글면 <b>다른 데서 온 것</b>으로 보인다. */

  /* 빈 칸은 점선이다. 실선으로 두면 <b>비어 있는 카드</b>가 되어 만들다 만
     것처럼 보이는데, 점선은 자리를 잡아 둔 것으로 읽힌다. */
  border: 1px dashed var(--border);
  background: rgba(255, 255, 255, 0.015);
}

/* 채워진 칸에는 놀이판 한 장이 깔린다. 칸이 정사각형이고 놀이판도
   정사각형이라 <c>cover</c>로 잘려 나가는 데가 없다. */
.box.filled {
  border: 1px solid var(--border);
  background: #090c12 url('/screenshots/cf-mini.webp') center / cover no-repeat;
}

.face {
  font-size: 22px;
  font-weight: 700;
  color: #3d465a;
}

.label {
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.06em;
  line-height: 1.3;
  color: #4d566a;
}

/* 이름이 있는 칸만 한 단계 밝다. 넷이 나란히 선 줄에서 <b>어느 것이 실물이고
   어느 것이 자리인지</b>는 글자 밝기 하나로 갈린다 — 여기서 색을 맞춰 버리면
   빈 칸 셋도 뭔가 나온 것처럼 보인다. */
.label.named {
  color: var(--text);
}
</style>
