<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { track } from '@vercel/analytics'
import { t } from '../i18n'

/**
 * 여기 셋만 릴리즈마다 고친다.
 *
 * 파일 이름을 손으로 이어 붙이지 않는다 — 태그와 파일명이 어긋나면 <b>링크만
 * 조용히 404</b>가 되고, 그건 눌러 보기 전에는 아무 데도 안 나타난다.
 */
const repo = 'https://github.com/legendsteel11/lunchtea-app'
const version = '0.7.0'
const size = '25 MB'

const file = `LunchTea-${version}-win-x64.zip`
const href = `${repo}/releases/download/v${version}/${file}`

/**
 * 이 사이트의 주소. <b>Vercel이 주소를 내주면 채운다.</b>
 *
 * 비어 있으면 폰 안내가 통째로 안 나온다 — "주소를 복사해 두세요"라고 해 놓고
 * 복사할 것이 없으면 그건 안내가 아니라 고장이다.
 *
 * 복사하는 주소에는 <b>UTM을 붙이지 않는다.</b> 지금 페이지 주소를 그대로
 * 복사하면 유입 표시가 따라 퍼져서, 나중에 그 사람이 PC에서 연 것까지 원래
 * 채널에서 온 것으로 잡힌다.
 */
const site = ''

const siteLabel = computed(() => site.replace(/^https?:\/\//, '').replace(/\/$/, ''))

const copied = ref(false)
let clear: ReturnType<typeof setTimeout> | undefined

async function copySite() {
  // <b>성공과 실패를 갈라 센다.</b> 인앱 브라우저(SNS 안에서 열리는 것)는
  // 클립보드가 막히는 일이 흔한데, 막혔다면 그 사람은 누르고도 아무것도
  // 못 가져갔고 체크 표시도 못 봤으니 고장으로 읽혔을 것이다.
  //
  // ok=no가 많으면 클립보드 자체가 안 되는 것이라 다른 길을 봐야 하고,
  // ok=yes가 대부분인데 수가 적으면 문제는 "안 누른다"는 쪽이라 자리와
  // 문구를 봐야 한다.
  try {
    await navigator.clipboard.writeText(site)

    copied.value = true
    clearTimeout(clear)
    clear = setTimeout(() => (copied.value = false), 2000)

    track('copy_link', { ok: 'yes' })
  } catch {
    // 막힌 브라우저에서도 주소는 화면에 그대로 적혀 있어 손으로 골라 복사할
    // 수 있다. 그래서 화면에 따로 알릴 것은 없다 — 세기만 한다.
    track('copy_link', { ok: 'no' })
  }
}

onUnmounted(() => clearTimeout(clear))

/**
 * 업데이트 내역. 새 판이 i18n의 맨 위에 얹히고, 지난 판은 꺾쇠로 넘겨 본다.
 *
 * <b>아직 안 올라간 판은 감춘다.</b> 위의 <c>version</c>보다 높은 덩이를 여기서
 * 걸러내므로, 다음 판의 내역을 미리 적어 두어도 파일이 올라가기 전에는 나오지
 * 않는다 — 없는 파일을 광고하는 일이 데이터만 고쳐서는 안 생긴다.
 */
const rank = (v: string) => v.split('.').map(Number)

const atOrBelow = (v: string) => {
  const a = rank(v)
  const b = rank(version)

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0)
    if (d !== 0) return d < 0
  }
  return true
}

const notes = computed(() => t.value.download.notes.filter((n) => atOrBelow(n.version)))

// 0이 가장 최신. 언어를 바꿔도 덩이 수가 같으므로 보던 자리가 유지된다.
const noteAt = ref(0)

const note = computed(() => notes.value[Math.min(noteAt.value, notes.value.length - 1)])

/**
 * 누른 것을 센다.
 *
 * <b>이 숫자는 "누른 수"이지 "받은 수"가 아니다.</b> 실제로 내려받은 수는 GitHub이
 * 자산마다 따로 세고 있으므로(릴리즈 API의 <c>download_count</c>) 둘을 함께 본다 —
 * 링크가 도는지는 이쪽이, 정말 받아 갔는지는 그쪽이 답한다.
 *
 * 링크를 막지 않는다(preventDefault 없음). 받는 링크는 페이지를 떠나게 하지
 * 않고 브라우저가 내려받기만 시작하므로, 이벤트가 잘릴 자리가 없다.
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

      <!-- 이번 판에 무엇이 생겼는가. 단추 바로 위에 둔다 — 받을지 정하기
           직전에 보는 자리라 <b>새로 생긴 기능만</b> 올린다. 고친 자리와
           내부 정리는 여기 올리지 않는다(받는 사람에겐 그동안 고장나 있었다는
           말로만 읽힌다).

           덩이가 하나도 없으면 카드째 안 나온다. 첫 판에는 견줄 지난 판이
           없어서, 빈 카드가 서 있으면 <b>내역이 있어야 하는데 비었다</b>로
           읽힌다. -->
      <div v-if="note" class="card notes">
        <div class="notes-head">
          <span>v{{ note.version }} {{ t.download.notesTitle }}</span>

          <!-- 넘길 판이 없으면 꺾쇠 자체를 안 그린다. 눌러도 아무 일 없는
               단추 둘은 카드만 복잡하게 한다 — 판이 쌓이면 저절로 나타난다. -->
          <span v-if="notes.length > 1" class="turns">
            <button type="button" class="turn" :disabled="noteAt >= notes.length - 1"
                    :aria-label="t.download.notesOlder" @click="noteAt++">‹</button>
            <button type="button" class="turn" :disabled="noteAt === 0"
                    :aria-label="t.download.notesNewer" @click="noteAt--">›</button>
          </span>
        </div>

        <ul>
          <li v-for="line in note.items" :key="line">{{ line }}</li>
        </ul>
      </div>

      <!-- 폰으로 들어온 사람에게 다음 걸음을 준다. 다운로드 단추 <b>위</b>에
           둔다 — 눌러 보고 나서 안 되는 것을 아는 것보다, 누르기 전에 다음
           걸음을 아는 편이 낫다. -->
      <div v-if="site" class="handoff">
        <p>{{ t.download.mobileNote }}</p>
        <div class="handoff-row">
          <code>{{ siteLabel }}</code>
          <button type="button" @click="copySite">
            {{ copied ? t.download.copied : t.download.copyLink }}
          </button>
        </div>
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
  max-width: var(--panel);
  margin: 0 auto;
  padding: 36px 28px 30px;
  text-align: center;
}

/* ---------- 업데이트 내역 ---------- */
/* 받는 단추 바로 위에 서지만 <b>단추보다 조용해야 한다.</b> 폭은 아래 상자와
   같은 --panel이라 둘이 한 기둥으로 읽힌다. */
.notes {
  max-width: var(--panel);
  margin: 0 auto 16px;
  padding: 18px 22px;
  text-align: left;
}

.notes-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-strong);
  margin-bottom: 10px;
}

/* 꺾쇠 둘은 제목 오른쪽에 붙여 한 묶음으로 둔다. 왼쪽에 두면 판이 쌓일 때
   제목이 오른쪽으로 밀려 카드마다 시작선이 달라진다. */
.turns {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-left: 2px;
}

/* 제목과 같은 색이되 한 겹 물러나 있는다 — 있는 줄은 알되 제목보다 먼저 눈에
   들지는 않게. 글자가 작아 한 호 키우고 누를 자리도 넉넉히 준다. */
.turn {
  font-family: inherit;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 0.15s ease;
}

.turn:hover:not(:disabled),
.turn:focus-visible:not(:disabled) {
  opacity: 1;
}

/* 갈 곳이 없는 쪽. 자리는 지키되 눌리지 않는다는 것이 보이는 선까지만 죽인다 —
   너무 흐리면 아예 없는 것으로 읽혀 반대쪽 꺾쇠도 못 찾는다. */
.turn:disabled {
  opacity: 0.3;
  cursor: default;
}

.notes ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/* 점은 ::marker 대신 직접 찍는다 — 접힌 줄이 점 아래로 파고들지 않게 본문을
   들여쓰고 점만 그 왼쪽에 세운다. */
.notes li {
  position: relative;
  padding-left: 15px;
  font-size: 15px;
  line-height: 1.65;
}

.notes li::before {
  content: '·';
  position: absolute;
  left: 2px;
  color: var(--accent-strong);
  font-weight: 700;
}

/* ---------- 폰으로 들어온 사람 ---------- */
/* 화면 폭이 아니라 <b>입력 방식</b>으로 가른다 — 창을 좁힌 데스크톱에는 뜨지
   않는다. 거기서는 받을 수 있으므로 안내할 것이 없다. */
.handoff {
  display: none;
}

@media (hover: none) and (pointer: coarse) {
  .handoff {
    display: block;
    max-width: var(--panel);
    margin: 0 auto 16px;
    padding: 14px 16px;
    background: var(--accent-bg);
    border-radius: 12px;
    text-align: center;
  }
}

.handoff p {
  font-size: 14px;
  line-height: 1.6;
  /* 문구 안의 줄바꿈을 그대로 살린다 — 두 문장을 한 줄로 이으면 좁은 화면에서
     아무 데서나 접혀 "PC에서" 같은 말이 줄 끝에 걸린다. */
  white-space: pre-line;
  color: var(--accent-strong);
  margin-bottom: 10px;
}

.handoff-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.handoff code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--bg);
  color: var(--text-strong);
  user-select: all;
}

.handoff button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border: 0;
  border-radius: 8px;
  background: var(--accent);
  color: #0d1017;
  cursor: pointer;
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
