import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 포트를 못박는다. 기본값은 자리가 차 있으면 조용히 다음 번호로 옮겨 가는데,
  // 그러면 습관대로 5174를 연 사람은 예전에 띄워 둔 서버(=옛 화면)를 보게 된다.
  // strictPort는 자리가 차 있으면 옮기지 않고 실패해서, 좀비 서버가 남아 있다는
  // 것을 그 자리에서 알려 준다.
  //
  // TabStick 랜딩이 5173을 쓰므로 이쪽은 5174다 — 둘을 함께 띄워 두고 견주는
  // 일이 잦다.
  server: {
    port: 5174,
    strictPort: true,
  },
})
