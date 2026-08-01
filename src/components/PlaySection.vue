<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <section id="play">
    <div class="container">
      <div class="section-heading">
        <h2>{{ t.play.title }}</h2>
      </div>

      <div class="cols">
        <div class="card panel">
          <h3>{{ t.play.controlsTitle }}</h3>
          <dl>
            <template v-for="row in t.play.controls" :key="row[0]">
              <dt>{{ row[0] }}</dt>
              <dd>{{ row[1] }}</dd>
            </template>
          </dl>
        </div>

        <div class="card panel">
          <h3>{{ t.play.shortcutsTitle }}</h3>
          <dl class="keys">
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
    </div>
  </section>
</template>

<style scoped>
.cols {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 14px;
  align-items: start;
}

@media (max-width: 780px) {
  .cols {
    grid-template-columns: 1fr;
  }
}

.panel {
  padding: 24px;
}

.panel h3 {
  font-size: 15px;
  margin-bottom: 16px;
  color: var(--text);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 18px;
  margin: 0;
  font-size: 14.5px;
}

dt {
  color: var(--text-strong);
  font-weight: 500;
  white-space: nowrap;
}

dd {
  margin: 0;
}

/* 단축키 쪽은 키 이름이 짧아 오른쪽이 넓게 남는다. 그쪽만 폭을 고정해
   두 칸이 나란히 서게 한다. */
.keys {
  grid-template-columns: 96px 1fr;
}

.note {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  opacity: 0.85;
}

@media (max-width: 480px) {
  dl,
  .keys {
    grid-template-columns: 1fr;
    gap: 2px 0;
  }

  dd {
    margin-bottom: 12px;
  }
}
</style>
