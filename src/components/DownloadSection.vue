<script setup lang="ts">
import { track } from '@vercel/analytics'
import { t } from '../i18n'

/**
 * 여기 셋만 릴리즈마다 고친다.
 *
 * 파일 이름을 손으로 이어 붙이지 않는다 — 태그와 파일명이 어긋나면 <b>링크만
 * 조용히 404</b>가 되고, 그건 눌러 보기 전에는 아무 데도 안 나타난다.
 */
const repo = 'https://github.com/legendsteel11/lunchtea-app'
const version = '0.1.4'
const size = '25 MB'

const file = `LunchTea-${version}-win-x64.zip`
const href = `${repo}/releases/download/v${version}/${file}`

/**
 * 누른 것을 센다.
 *
 * <b>이 숫자는 "누른 수"이지 "받은 수"가 아니다.</b> 실제로 내려받은 수는 GitHub이
 * 자산마다 따로 세고 있으므로(릴리즈 API의 <c>download_count</c>) 둘을 함께 본다 —
 * 링크가 도는지는 이쪽이, 정말 받아 갔는지는 그쪽이 답한다.
 */
function trackDownload() {
  track('download', { version })
}
</script>

<template>
  <section id="download" class="download">
    <div class="container">
      <div class="section-heading">
        <h2>{{ t.download.title }}</h2>
      </div>

      <div class="card box">
        <a class="btn btn-primary" :href="href" @click="trackDownload">
          {{ t.download.button }}
        </a>

        <p class="meta">
          <span>{{ t.download.version }} {{ version }}</span>
          <span class="dot">·</span>
          <span>{{ size }}</span>
          <span class="dot">·</span>
          <span>{{ t.download.requirements }}</span>
          <!-- GitHub으로 보내는 링크는 뺐다. 받으러 온 사람에게 <b>다른 데로
               가는 문</b>을 열어 주면, 받는 대신 그쪽을 구경하다 나간다. -->

        </p>

        <p class="install" v-html="t.download.install"></p>
        <p class="first-run" v-html="t.download.firstRun"></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download {
  scroll-margin-top: 72px;
}

.box {
  max-width: 620px;
  margin: 0 auto;
  padding: 36px 28px 30px;
  text-align: center;
}

.meta {
  margin-top: 16px;
  font-size: 13.5px;
}

.meta .dot {
  margin: 0 8px;
  opacity: 0.45;
}

.install {
  margin-top: 20px;
  font-size: 14.5px;
  color: var(--text-strong);
}

/* 첫 실행 안내는 <b>변명이 아니라 사용법</b>이라 남긴다. 다만 버튼 바로 밑에
   붙이지 않고 한 칸 내려 작게 둔다 — 받을지 정하는 자리와 받은 뒤에 읽는 자리는
   다르다. */
.first-run {
  margin-top: 10px;
  font-size: 13px;
  opacity: 0.8;
}

</style>
