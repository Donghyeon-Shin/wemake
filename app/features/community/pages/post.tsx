import { ChevronUpIcon, DotIcon } from 'lucide-react';
import { Form, Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
import { Button } from '~/common/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../common/components/ui/avatar';
import { Textarea } from '../../../common/components/ui/textarea';
import type { Route } from './+types/post';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post | wemake' }];
};

export default function Post() {
  return (
    <div className='grid grid-cols-6 gap-40 items-start'>
      <div className='col-span-4 space-y-10'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to='/community'>Community</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to='/community?topic=productivity'>Productivity</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to='/community/postId'>What is the best productivity tool?</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex w-full items-start gap-10'>
          <Button variant='outline' className='flex flex-col h-14'>
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>100</span>
          </Button>
          <div className='space-y-20'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold'>What is the best productivity tool?</h2>
              <div className='flex items-center gap-2.5 text-sm leading-tight text-muted-foreground'>
                <span>John Doe</span>
                <DotIcon className='size-5' />
                <span>Productivity</span>
                <DotIcon className='size-5' />
                <span>10 replies</span>
              </div>
              <p className='text-sm w-3/4 text-muted-foreground'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </div>
            <Form className='flex items-start gap-5 w-3/4'>
              <Avatar className='size-14'>
                <AvatarImage src='https://github.com/shadcn.png' alt='John Doe' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-5 items-end w-full'>
                <Textarea placeholder='Add a reply...' className='w-full resize-none' rows={10} />
                <Button type='submit'>Reply</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <aside className='col-span-2'></aside>
    </div>
  );
}
