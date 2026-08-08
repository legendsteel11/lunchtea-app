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
      about: '런치티란?',
      play: '사용법',
      download: '다운로드',
    },
    hero: {
      eyebrow: 'Windows 데스크톱 토이 프로젝트',
      title: 'LunchTea',
      tagline: '작업 중 기다려야 할 때, 잠깐 차 한잔 하고 가세요.',
      shot: '작업 화면 한켠에서 돌아가고 있는 런치티',
    },
    soon: {
      title: '앞으로 계속 추가될 예정입니다',
      soon: 'Coming soon',
    },
    about: {
      title: '런치티란?',
      lead: '일하는 화면 한켠에 띄워 두는 작은 소품 모음입니다.',
      leadSub: '잠시 시간이 날 때 한 손으로 차를 마시며 만지작거릴 수 있어요.',
      items: [
        {
          title: '기다리는 시간에',
          desc: 'AI가 답을 만드는 동안, 렌더링이나 컴파일을 걸어 둔 동안. 커서를 옮겨 잠깐 휴식하세요.',
        },
        {
          title: '커서만 가져가면 됩니다',
          desc: '작고 깜찍한 일이 벌어져요. 일로 돌아갈 때는 커서를 빼기만 하면 돼요 — 저장도 종료도 없습니다.',
        },
        {
          title: '잠시 멍때리기 좋은.',
          desc: '머리가 복잡할 때 잠깐 쳐다보세요. 아무것도 안 하고 있어도 화면 안에서는 계속 뭔가 벌어지고 있어요.',
        },
        {
          title: '편한 위치, 편한 크기로',
          desc: '크기도 자리도 마음대로 바꾸고, 소리도 켰다 껐다 할 수 있어요. 오버레이 모드로도 쓸 수 있고요.',
        },
        {
          title: '하나씩 늘어날 예정입니다.',
          desc: '한 프로그램 안에 여러 개가 들어갑니다. 나중에는 그날 마음에 드는 것으로 골라 쓸 수 있어요.',
        },
        {
          title: '소소한 덤',
          desc: '마우스 감도 테스트, 혹은 손목 운동이 될지도 몰라요…(개인적인 생각일 뿐입니다)',
        },
      ],
    },
    play: {
      title: '사용법',
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
        ['B', '기록 보기'],
        ['Shift + Esc', '종료'],
      ],
      menuNote: '제목 표시줄을 우클릭하면 설정을 바꾸거나 단축키를 볼 수 있습니다.',
    },
    download: {
      // 섹션 제목은 뺐다(2026-08-01). 위쪽 메뉴·제목·단추에 같은 말이 세 번
      // 겹쳤고, 받는 자리는 단추 하나로 이미 분명하다.
      button: '다운로드',

      // 파일이 아직 안 올라갔을 때. <b>단추를 감추지 않고 눌리지 않게</b>
      // 둔다 — 없으면 받는 자리가 통째로 사라져서 이 페이지가 무엇을
      // 주는 곳인지 흐려지고, 곧 생긴다는 것도 전할 수 없다.
      pending: '준비 중입니다',
      version: '버전',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: '설치가 필요 없습니다. 압축을 풀고 <code>LunchTea.exe</code>를 누르면 바로 시작합니다.',
      firstRun:
        '처음 실행하면 Windows가 확인 창을 띄웁니다 — <b>추가 정보 → 실행</b>을 누르면 됩니다.',

      // ── 업데이트 내역 ──
      //
      // 새 판이 나오면 **맨 위에** 한 덩이를 얹는다. 지난 판은 지우지 않는다 —
      // 꺾쇠로 넘겨 본다. DownloadSection이 지금 올라간 버전보다 높은 덩이는
      // 감추므로, 파일을 올리기 전에 미리 적어 두어도 광고가 앞서 나가지 않는다.
      //
      // **새로 생긴 것만 적는다.** 고친 자리는 받는 사람에게 "그동안 고장나
      // 있었다"로만 읽힌다.
      //
      // 지금은 비어 있다 — **첫 판이라 견줄 지난 판이 없다.** 비어 있으면
      // 카드 자체가 안 나온다. 다음 판을 낼 때 여기 한 덩이를 얹는다.
      notesTitle: '업데이트 내역',

      // 꺾쇠 단추를 읽어 주는 이름. 화면에는 안 보이고 스크린리더만 읽는다.
      notesOlder: '이전 업데이트 내역',
      notesNewer: '다음 업데이트 내역',

      notes: [
        {
          version: '0.8.0',
          items: [
            '커서를 창 밖으로 빼면 보스가 물러나는데, 혼자 있던 시간만큼 몸을 때우고 돌아옵니다. 잠깐 나갔다 오면 아주 조금, 오래 자리를 비우면 그만큼 더.',
          ],
        },
      ] as Array<{ version: string; items: string[] }>,

      // ── 폰으로 들어온 사람 ──
      //
      // 받을 수 없다는 사실은 어차피 곧 알게 된다. 문제는 그때 **손에 아무것도
      // 없다는 것**이라, 못 받는다고 말하는 대신 주소를 쥐여 준다.
      mobileNote: 'Windows에서 쓰는 앱입니다.\n주소를 복사해 두었다가 PC에서 열어보세요.',
      copyLink: '주소 복사',
      copied: '복사했습니다',
    },
    notice: {
      title: '드리는 말씀',

      // 이 한 줄만 밝게 세운다. "시험판"이라는 딱지 대신 <b>지금 어디쯤인지</b>를
      // 말하는 자리다 — 딱지는 받을지 말지를 가르지만, 이 말은 지금 받은 것이
      // 계속 나아진다는 쪽으로 읽힌다.
      //
      // "아직 개발 초기입니다"에서 옮겼다(2026-08-01). <b>같은 사실인데
      // 한쪽은 기대를 낮춘다</b> — "초기"는 덜 됐다는 말이라 받기 직전에
      // 망설일 이유가 되고, "진행중"은 계속 나온다는 쪽으로 읽힌다.
      highlight: '개발 진행중인 프로젝트입니다. 계속 만들어 나가겠습니다.',
      items: [
        '1인 개인 개발자입니다.',
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
      about: 'What is LunchTea?',
      play: 'How to use',
      download: 'Download',
    },
    hero: {
      eyebrow: 'A desktop toy project for Windows',
      title: 'LunchTea',
      tagline: 'While you wait on something at work, stop by for a cup of tea.',
      shot: 'LunchTea running in a corner of a working screen',
    },
    soon: {
      title: 'More will keep being added',
      soon: 'Coming soon',
    },
    about: {
      title: 'What is LunchTea?',
      lead: 'A set of small things you keep open in a corner of your screen while you work.',
      leadSub: 'When you have a moment, poke at it with one hand while the other holds your tea.',
      items: [
        {
          title: 'For the waiting',
          desc: 'While an AI is writing its answer, while a render or a build is running. Move your cursor over and take a short break.',
        },
        {
          title: 'Just bring the cursor over',
          desc: 'Something small and silly happens. To get back to work, move the cursor out — nothing to save, nothing to close.',
        },
        {
          title: 'A place to zone out.',
          desc: 'Take a look when your head is full. Even when you do nothing, something is still going on in there.',
        },
        {
          title: 'Any size, any spot',
          desc: 'Resize it, move it, mute it. It works as an overlay too.',
        },
        {
          title: 'More are on the way.',
          desc: 'More of them will live inside the same program. Later you can pick whichever one you feel like that day.',
        },
        {
          title: 'A small bonus',
          desc: 'A mouse sensitivity test, or wrist exercise… (just a personal theory)',
        },
      ],
    },
    play: {
      title: 'Controls',
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
        ['B', 'View records'],
        ['Shift + Esc', 'Quit'],
      ],
      menuNote: 'Right-click the title bar to change settings or see the shortcuts.',
    },
    download: {
      button: 'Download',
      pending: 'Coming soon',
      version: 'Version',
      requirements: 'Windows 10 · 11 (64-bit)',
      install: 'No installer. Unzip and run <code>LunchTea.exe</code>.',
      firstRun:
        'Windows may show a SmartScreen prompt the first time — choose <b>More info → Run</b>.',

      notesTitle: 'Update notes',
      notesOlder: 'Older update notes',
      notesNewer: 'Newer update notes',

      // 한국어 쪽 덩이와 <b>수가 같아야 한다.</b> 언어를 바꿔도 보던 자리가
      // 그대로 유지되는 것이 그 전제다.
      notes: [
        {
          version: '0.8.0',
          items: [
            'A boss that retreats while the cursor is away now comes back partly repaired — a little for a short break, more for a long one.',
          ],
        },
      ] as Array<{ version: string; items: string[] }>,

      mobileNote: 'LunchTea runs on Windows.\nCopy the link and open it on your PC.',
      copyLink: 'Copy link',
      copied: 'Copied',
    },
    notice: {
      title: 'Two notes',
      highlight: 'This project is under active development. I will keep building it.',
      items: [
        'Made by one person.',
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
