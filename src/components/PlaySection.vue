<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="play">
    <div class="container">
      <div class="section-heading">
        <h2>{{ t.play.title }}</h2>
      </div>

      <!-- 카드 <b>하나</b>다. 둘로 나눠 나란히 두었더니 왼쪽은 네 줄, 오른쪽은
           여섯 줄이라 높이가 안 맞고, 그 어긋남이 <b>둘 중 하나가 덜 채워진
           것</b>처럼 보였다. 같은 성격의 표라 위아래로 쭉 이어 두는 편이 낫다. -->
      <div class="card panel">
        <h3>{{ t.play.controlsTitle }}</h3>
        <dl>
          <template v-for="row in t.play.controls" :key="row[0]">
            <dt>{{ row[0] }}</dt>
            <dd>{{ row[1] }}</dd>
          </template>
        </dl>

        <h3 class="second">{{ t.play.shortcutsTitle }}</h3>
        <dl>
          <template v-for="row in t.play.shortcuts" :key="row[0]">
            <dt><code>{{ row[0] }}</code></dt>
            <dd>{{ row[1] }}</dd>
          </template>
        </dl>

        <!-- 키를 외우지 않아도 되는 길이 있다는 것을 <b>키 표 바로 아래</b>에
             적는다. 표만 있으면 이 여섯을 기억해야 하는 줄 알게 된다. -->
        <p class="note">{{ t.play.menuNote }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel {
  max-width: 720px;
  margin: 0 auto;
  padding: 28px 30px 26px;
}

h3 {
  font-size: 13px;
  margin-bottom: 16px;
  color: var(--text);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.second {
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

/* 두 표가 <b>같은 왼쪽 칸</b>을 쓴다. 폭을 따로 두면 위아래로 이어 놓아도
   설명이 서로 다른 자리에서 시작해 두 표로 읽힌다. */
dl {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 12px 20px;
  margin: 0;
  font-size: 14.5px;
}

dt {
  color: var(--text-strong);
  font-weight: 500;
}

dd {
  margin: 0;
}

.note {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  opacity: 0.85;
}

@media (max-width: 560px) {
  dl {
    grid-template-columns: 1fr;
    gap: 2px 0;
  }

  dd {
    margin-bottom: 14px;
  }
}
</style>
