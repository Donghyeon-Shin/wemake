import { redirect } from 'react-router';

// Loader : 벡엔드(서버)에서 실행됨, UI에 필요한 데이터를 가져오거나 다른 곳으로 리다이렉트 할 때 사용
export function loader() {
  return redirect('/products/leaderboards');
}
