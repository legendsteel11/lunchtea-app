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
 *
 * <b>여기 없는 것</b>: 없는 기능 나열, 경쟁 앱 추천, 기대를 낮추는 말, 사전 릴리즈
 * 딱지. 처음 보는 사람 앞에서는 그것들이 전부 "받지 말라"는 신호로 읽힌다. 솔직한
 * 이야기는 README와 도움말처럼 <b>이미 관심이 생겨 찾아온 사람</b>이 보는 자리에 둔다.
 */
const dict = {
  ko: {
    nav: {
      about: '무엇인가요',
      play: '조작',
      download: '다운로드',
      roadmap: '앞으로',
    },
    hero: {
      eyebrow: 'Windows 데스크톱 토이',
      title: 'LunchTea',
      sub: 'Cursor Fighter',
      tagline: '마우스 커서가 곧 기체입니다. 창을 열어 두고, 손이 빌 때마다 몇 분씩.',
      cta: '다운로드',
      ctaNote: 'Windows 10 · 11 (64-bit)',
      shot: '게임 화면',
    },
    soon: {
      title: '한 벌로 만들고 있습니다',
      desc: '토이가 하나씩 늘어납니다. 지금은 첫 번째가 나왔습니다.',
      soon: 'Coming soon',
    },
    about: {
      title: '무엇인가요',
      items: [
        {
          title: '마우스 하나로',
          desc: '커서가 곧 기체입니다. 움직여서 피하면 조준과 사격은 알아서 나갑니다. 왼쪽 버튼을 누르고 있으면 강화샷이 모이고, 놓으면 사방으로 터집니다.',
        },
        {
          title: '창을 벗어나면 멈춥니다',
          desc: '커서가 창 밖으로 나가면 판이 그 자리에 서고, 돌아오면 이어서 시작합니다. 시작 버튼도 일시정지 버튼도 없습니다.',
        },
        {
          title: '아무도 없으면 저희끼리 놉니다',
          desc: '자리를 비운 동안 화면의 네모들이 모여 떠들고, 티격태격하고, 가끔은 하나를 데려갑니다. 돌아오면 흩어집니다.',
        },
        {
          title: '창은 마음대로',
          desc: '크기와 자리를 바꿔 가며 씁니다. 좁게 쓸수록 피할 자리가 줄어드는 만큼 점수를 더 받습니다.',
        },
        {
          title: '다섯 번의 보스',
          desc: '보스를 하나 깰 때마다 새 종류가 하나씩 열립니다. 마지막은 여덟 칸으로 둘러싸인 핵입니다.',
        },
        {
          title: '기록은 이 PC에만',
          desc: '계정도, 로그인도, 서버로 나가는 것도 없습니다. 최고 기록은 내 컴퓨터에만 남습니다.',
        },
      ],
    },
    play: {
      title: '조작',
      controlsTitle: '노는 법',
      controls: [
        ['커서를 창 안으로', '판이 시작됩니다'],
        ['마우스 이동', '커서가 기체입니다. 움직여서 피합니다'],
        ['가만히 두어도', '가까운 적을 알아서 겨누고 쏩니다'],
        ['왼쪽 버튼 꾹', '강화샷을 모읍니다. 놓으면 사방으로 터집니다'],
        ['커서를 창 밖으로', '그 자리에서 멈춥니다'],
      ],
      shortcutsTitle: '단축키',
      shortcuts: [
        ['F1', '화면 위에 띄우기'],
        ['F2', '창 크기'],
        ['P', '창 위치'],
        ['M / F11', '소리 켜기·끄기'],
        ['F12', '볼륨'],
        ['Shift + Esc', '종료'],
      ],
    },
    download: {
      title: '다운로드',
      button: '내려받기',
      version: '버전',
      size: '압축 파일',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: '설치가 필요 없습니다. 압축을 풀고 <code>LunchTea.exe</code>를 누르면 바로 시작합니다.',
      firstRun:
        '처음 실행하면 Windows가 확인 창을 띄웁니다 — <b>추가 정보 → 실행</b>을 누르면 됩니다.',
      github: 'GitHub에서 보기',
    },
    roadmap: {
      title: '앞으로 만들 것들',
      desc: '순서는 바뀔 수 있습니다.',
      items: [
        '토이 세 개를 더 만들어 한 벌로 묶기',
        '판마다 규칙이 달라지는 모드',
        '기록판 손보기 — 지금은 이 PC의 열 줄뿐입니다',
        '쓰는 사람이 생기면, 난이도를 몇 번 눌러 답하는 설문',
      ],
    },
    footer: {
      made: '만든 것들',
      tabstick: 'TabStick — 창에 붙는 인덱스 메모',
      edgetree: 'Edgetree — 트리로 여는 탐색기',
      source: '소스는 정리되는 대로 공개합니다.',
      rights: '개인 프로젝트입니다.',
    },
    langButton: 'EN',
  },

  en: {
    nav: {
      about: 'What it is',
      play: 'Controls',
      download: 'Download',
      roadmap: 'Next',
    },
    hero: {
      eyebrow: 'A desktop toy for Windows',
      title: 'LunchTea',
      sub: 'Cursor Fighter',
      tagline:
        'Your mouse cursor is the ship. Leave the window open and play a few minutes whenever your hands are free.',
      cta: 'Download',
      ctaNote: 'Windows 10 · 11 (64-bit)',
      shot: 'Gameplay',
    },
    soon: {
      title: 'A set, one toy at a time',
      desc: 'More toys are on the way. This is the first one.',
      soon: 'Coming soon',
    },
    about: {
      title: 'What it is',
      items: [
        {
          title: 'One mouse, nothing else',
          desc: 'The cursor is your ship. Move to dodge — aiming and firing happen on their own. Hold the left button to charge a shot, release it and it bursts in every direction.',
        },
        {
          title: 'Leave the window, the run pauses',
          desc: 'Move the cursor out and everything stops right where it was. Move it back and the run picks up. No start button, no pause button.',
        },
        {
          title: 'They keep themselves busy',
          desc: 'While you are away the squares gather, bicker, and now and then one of them gets taken away. They scatter when you come back.',
        },
        {
          title: 'Any size, anywhere',
          desc: 'Resize and move the window as you like. The smaller you play, the less room you have to dodge — and the more each kill is worth.',
        },
        {
          title: 'Five bosses',
          desc: 'Every boss you clear opens something new. The last one is a core wrapped in eight cells.',
        },
        {
          title: 'Scores stay on your PC',
          desc: 'No account, no sign-in, nothing leaves your machine. Your best run is saved locally.',
        },
      ],
    },
    play: {
      title: 'Controls',
      controlsTitle: 'How to play',
      controls: [
        ['Cursor into the window', 'The run begins'],
        ['Move the mouse', 'The cursor is your ship — move to dodge'],
        ['Do nothing else', 'It aims at the nearest enemy and fires'],
        ['Hold left button', 'Charges a shot. Release and it bursts outward'],
        ['Cursor out of the window', 'Everything stops where it is'],
      ],
      shortcutsTitle: 'Shortcuts',
      shortcuts: [
        ['F1', 'Keep on top'],
        ['F2', 'Window size'],
        ['P', 'Window position'],
        ['M / F11', 'Sound on/off'],
        ['F12', 'Volume'],
        ['Shift + Esc', 'Quit'],
      ],
    },
    download: {
      title: 'Download',
      button: 'Download',
      version: 'Version',
      size: 'Zip',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: 'No installer. Unzip and run <code>LunchTea.exe</code>.',
      firstRun:
        'Windows may show a SmartScreen prompt the first time — choose <b>More info → Run</b>.',
      github: 'View on GitHub',
    },
    roadmap: {
      title: 'What comes next',
      desc: 'The order may change.',
      items: [
        'Three more toys, bundled as one set',
        'A mode where the rules change from run to run',
        'A better scoreboard — right now it is ten local rows',
        'If people play it, a one-click survey about difficulty',
      ],
    },
    footer: {
      made: 'Also made',
      tabstick: 'TabStick — index notes that stick beside a window',
      edgetree: 'Edgetree — a tree-shaped file explorer',
      source: 'The source will be opened once it is tidied up.',
      rights: 'A personal project.',
    },
    langButton: '한국어',
  },
} as const

export const t = computed(() => dict[lang.value])
