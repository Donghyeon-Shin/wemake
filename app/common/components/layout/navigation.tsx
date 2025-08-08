import { Link } from 'react-router';
import { Separator } from '~/common/components/ui/separator';

export default function Navigation() {
  return (
    <nav className='flex px-20 h-16 items-center justify-between backdrop-blur-2xl fixed top-0 left-0 right-0 z-50 bg-background/50'>
      <div className='flex items-center gap-4'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          wemake
        </Link>
        <Separator orientation='vertical' className='h-6 mx-4' />
      </div>
    </nav>
  );
}
