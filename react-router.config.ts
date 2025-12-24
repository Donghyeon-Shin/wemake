import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true, // 서버 사이드 렌더링 기본값, SPA 모드로 설정하려면 `false`로 설정
  presets: [vercelPreset],
} satisfies Config;
