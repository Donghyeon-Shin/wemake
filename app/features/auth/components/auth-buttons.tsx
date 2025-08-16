import { GithubIcon, LockIcon, MessageCircleIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Separator } from '~/common/components/ui/separator';

export function AuthButtons() {
  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div className='w-full flex flex-col items-center gap-2'>
        <Separator className='w-full' />
        <span className='text-xs text-muted-foreground uppercase font-medium'>
          Or continue with
        </span>
        <Separator className='w-full' />
      </div>
      <div className='w-full flex flex-col gap-2'>
        <Link to='/auth/social/kakao/start'>
          <Button variant='outline' className='w-full'>
            <MessageCircleIcon className='w-4 h-4' />
            Kakao Talk
          </Button>
        </Link>
        <Link to='/auth/social/github/start'>
          <Button variant='outline' className='w-full'>
            <GithubIcon className='w-4 h-4' />
            Github
          </Button>
        </Link>
        <Link to='/auth/otp/start'>
          <Button variant='outline' className='w-full'>
            <LockIcon className='w-4 h-4' />
            OTP
          </Button>
        </Link>
      </div>
    </div>
  );
}
