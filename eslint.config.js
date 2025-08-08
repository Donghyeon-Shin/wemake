import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'build', '.next', 'coverage'] }, // 무시할 디렉토리들
  {
    files: ['**/*.{ts,tsx}'], // ESLint가 검사할 파일 확장자 설정
    languageOptions: {
      parser: tseslint.parser, // TypeScript 파서 사용
      ecmaVersion: 'latest', // 최신 ECMAScript 버전 지원
      globals: {
        ...globals.browser, // 브라우저 전역 변수 허용
      },
      parserOptions: {
        sourceType: 'module', // ECMAScript 모듈 사용
        ecmaFeatures: { jsx: true }, // JSX 지원
        project: './tsconfig.json', // TypeScript 프로젝트 설정 참조
      },
    },
    settings: {
      react: { version: 'detect' }, // React 버전 자동 감지
    },
    plugins: {
      react, // React ESLint 플러그인
      'react-hooks': reactHooks, // React Hooks 플러그인
      'react-refresh': reactRefresh, // React Fast Refresh 플러그인
      prettier: prettierPlugin, // Prettier 플러그인 추가
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 추천 규칙 적용
      ...tseslint.configs.recommended[0].rules, // TypeScript ESLint 추천 규칙 적용
      ...tseslint.configs.stylistic.rules, // TypeScript ESLint 스타일 규칙 적용
      ...react.configs.recommended.rules, // React 추천 규칙 적용
      ...react.configs['jsx-runtime'].rules, // JSX 런타임 관련 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
      ...prettier.rules, // Prettier와 충돌하는 ESLint 규칙 비활성화

      // React 관련 규칙
      'react/jsx-no-target-blank': 'off', // target="_blank" 보안 경고 비활성화
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Fast Refresh 최적화
      'react/prop-types': 'off', // TypeScript 사용 시 불필요
      'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform 사용 시 불필요

      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 에러 (언더스코어로 시작하는 매개변수는 제외)
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 시 경고
      '@typescript-eslint/prefer-const': 'error', // let 대신 const 사용 강제
      '@typescript-eslint/no-var-requires': 'error', // require() 사용 금지 (import 사용 권장)

      // 일반적인 코드 품질 규칙
      'no-console': 'warn', // console 사용 시 경고
      'no-debugger': 'error', // debugger 사용 금지
      'prefer-const': 'error', // let 대신 const 사용 강제
      'no-var': 'error', // var 사용 금지 (let/const 사용 권장)

      // Prettier 관련 규칙
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
    },
  },
);
