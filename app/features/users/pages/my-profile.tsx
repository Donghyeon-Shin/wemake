import { redirect } from 'react-router';

export function loader() {
  //find users using the cookies
  return redirect('/users/dongle');
}
