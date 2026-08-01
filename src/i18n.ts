import { ref, computed } from 'vue'

export type Lang = 'ko' | 'en'

export const lang = ref<Lang>('ko')

export function toggleLang() {
  lang.value = lang.value === 'ko' ? 'en' : 'ko'
}

/**
 * 이 파일이 랜딩의 <b>모든 글</b>이다.
 *
 * 컴포넌트에는 문장을 두지 않는다 — 한쪽 언어에만 있는 문장이 생기면 그 자리에서
 * 티가 안 나고, 나중에 영어로 보는 사람에게만 빈칸으로 나타난다.
 */
const dict = {
  ko: {
    nav: {
      about: '무엇인가요',
      play: '조작',
      download: '다운로드',
    },
    hero: {
      eyebrow: 'Windows 데스크톱 토이 프로젝트',
      title: 'LunchTea',
      tagline: '작업 중 기다려야 할 때, 잠깐 차 한잔 하고 가세요.',
      cta: '다운로드',
      ctaNote: 'Windows 10 · 11 (64-bit)',
      shot: '화면',
    },
    soon: {
      title: '앞으로 계속 추가될 예정입니다',
      soon: 'Coming soon',
    },
    about: {
      title: '무엇인가요',
      items: [
        {
          title: '기다리는 시간에',
          desc: 'AI가 답을 만드는 동안, 렌더링이나 컴파일을 걸어 둔 동안. 유튜브를 켜기엔 애매한 그 몇 분에, 작은 창 하나에서 무언가 계속 일어납니다. 보고만 있어도 되고 끼어들어도 됩니다.',
        },
        {
          title: '마우스만 대면 됩니다',
          desc: '창에 마우스를 가져가 보세요. 작고 깜찍한 일이 벌어집니다. 일로 돌아갈 때는 마우스를 빼기만 하면 됩니다 — 저장도 종료도 없습니다.',
        },
        {
          title: '멍때리기 좋은 창',
          desc: '머리가 복잡할 때 잠깐 쳐다보기 좋습니다. 아무것도 안 하고 있어도 화면 안에서는 계속 뭔가 벌어지고 있습니다.',
        },
        {
          title: '창은 편한 대로',
          desc: '크기와 자리를 마음대로 바꾸고 소리도 켜고 끕니다. 제목 표시줄 없이 얹어 두는 오버레이 모드도 있습니다.',
        },
        {
          title: '덤으로 손목 운동',
          desc: '마우스 감도 시험이 될지도 모릅니다. 손목 운동도요.',
        },
        {
          title: '하나씩 늘어납니다',
          desc: '한 프로그램 안에 여러 개가 들어갑니다. 나중에는 그날 마음에 드는 것으로 골라서 놀면 됩니다.',
        },
      ],
    },
    play: {
      title: '조작',
      controlsTitle: '노는 법',
      controls: [
        ['커서를 창 안으로', '시작합니다'],
        ['마우스 이동', '커서를 직접 움직이면 됩니다'],
        ['마우스 클릭', '클릭이 되는 상황이면 그에 맞게 반응합니다'],
        ['커서를 창 밖으로', '구경 모드로 바뀝니다'],
      ],
      shortcutsTitle: '단축키',
      shortcuts: [
        ['F1', '오버레이 모드'],
        ['F2', '창 크기'],
        ['P', '창 위치'],
        ['M / F11', '소리 켜기·끄기'],
        ['F12', '볼륨'],
        ['Shift + Esc', '종료'],
      ],
      menuNote: '제목 표시줄을 우클릭하면 설정을 바꾸거나 단축키를 볼 수 있습니다.',
    },
    download: {
      title: '다운로드',
      button: '내려받기',
      version: '버전',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: '설치가 필요 없습니다. 압축을 풀고 <code>LunchTea.exe</code>를 누르면 바로 시작합니다.',
      firstRun:
        '처음 실행하면 Windows가 확인 창을 띄웁니다 — <b>추가 정보 → 실행</b>을 누르면 됩니다.',
    },
    notice: {
      title: '드리는 말씀',
      items: [
        '1인 개인 개발자입니다.',
        '개발 초기입니다. 앞으로 더 지켜봐 주세요.',
        '소중한 피드백을 기다리고 있습니다.',
      ],
    },
    footer: {
      contact: '문의',
      otherTool: '같은 개발자의 다른 도구',
      credits: '사용한 오픈소스',
      copyright: '© 2026 LunchTea.',
    },
    langButton: 'EN',
  },

  en: {
    nav: {
      about: 'What it is',
      play: 'Controls',
      download: 'Download',
    },
    hero: {
      eyebrow: 'A desktop toy project for Windows',
      title: 'LunchTea',
      tagline: 'While you wait on something at work, stop by for a cup of tea.',
      cta: 'Download',
      ctaNote: 'Windows 10 · 11 (64-bit)',
      shot: 'Screen',
    },
    soon: {
      title: 'More will keep being added',
      soon: 'Coming soon',
    },
    about: {
      title: 'What it is',
      items: [
        {
          title: 'For the waiting',
          desc: 'While an AI is writing its answer, while a render or a build is running. For those few minutes that are too short to open YouTube, something keeps happening in one small window. Watch it, or join in.',
        },
        {
          title: 'Just move your mouse over',
          desc: 'Bring the cursor into the window and something small and silly happens. To get back to work, move the cursor out — nothing to save, nothing to close.',
        },
        {
          title: 'A window to stare at',
          desc: 'Good for the moments when your head is full. Even when you do nothing, something is still going on in there.',
        },
        {
          title: 'Your window, your way',
          desc: 'Resize it, move it, mute it. There is an overlay mode that drops the title bar and just sits on top.',
        },
        {
          title: 'And a bit of wrist exercise',
          desc: 'It may double as a mouse sensitivity test. And wrist exercise.',
        },
        {
          title: 'One at a time',
          desc: 'More of them will live inside the same program. Later you can pick whichever one you feel like that day.',
        },
      ],
    },
    play: {
      title: 'Controls',
      controlsTitle: 'How it works',
      controls: [
        ['Cursor into the window', 'It starts'],
        ['Move the mouse', 'You move the cursor, that is all'],
        ['Click', 'If something is clickable, it answers'],
        ['Cursor out of the window', 'It switches to watching mode'],
      ],
      shortcutsTitle: 'Shortcuts',
      shortcuts: [
        ['F1', 'Overlay mode'],
        ['F2', 'Window size'],
        ['P', 'Window position'],
        ['M / F11', 'Sound on/off'],
        ['F12', 'Volume'],
        ['Shift + Esc', 'Quit'],
      ],
      menuNote: 'Right-click the title bar to change settings or see the shortcuts.',
    },
    download: {
      title: 'Download',
      button: 'Download',
      version: 'Version',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: 'No installer. Unzip and run <code>LunchTea.exe</code>.',
      firstRun:
        'Windows may show a SmartScreen prompt the first time — choose <b>More info → Run</b>.',
    },
    notice: {
      title: 'Two notes',
      items: [
        'Made by one person.',
        'These are early days. Stick around and see where it goes.',
        'Feedback is very welcome.',
      ],
    },
    footer: {
      contact: 'Contact',
      otherTool: 'Other tools by the same maker',
      credits: 'Open source used',
      copyright: '© 2026 LunchTea.',
    },
    langButton: '한국어',
  },
} as const

export const t = computed(() => dict[lang.value])
