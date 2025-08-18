import { ChevronDownIcon } from 'lucide-react';
import { Form, Link, useSearchParams } from 'react-router';
import { Hero } from '~/common/components/layout/hero';
import { Button } from '~/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/common/components/ui/dropdown-menu';
import { Input } from '~/common/components/ui/input';
import { PostCard } from '../components/post-card';
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../constants';
import { getPosts, getTopics } from '../queries';
import type { Route } from './+types/community';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Community | wemake' }];
};

export const loader = async () => {
  const topics = await getTopics();
  const posts = await getPosts();
  return { topics, posts };
};

export default function Community({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get('sorting') || 'newest';
  const period = searchParams.get('period') || 'all';

  return (
    <div>
      <Hero title='Community' subtitle='Share your ideas and get feedback from the community' />
      <div className='grid grid-cols-6 items-start gap-40'>
        <div className='col-span-4 space-y-10'>
          <div className='flex justify-between'>
            <div className='space-y-5 w-full'>
              <div className='flex items-center gap-5'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-1'>
                    <span className='text-sm capitalize'>{sorting}</span>
                    <ChevronDownIcon className='size-5' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option}
                        className='capitalize cursor-pointer'
                        onCheckedChange={(checked) => {
                          if (checked) {
                            searchParams.set('sorting', option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === 'popular' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-1'>
                      <span className='text-sm capitalize'>{period}</span>
                      <ChevronDownIcon className='size-5' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option}
                          className='capitalize cursor-pointer'
                          onCheckedChange={(checked) => {
                            if (checked) {
                              searchParams.set('period', option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className='w-2/3'>
                <Input type='text' name='search' placeholder='Search for discussions' />
              </Form>
            </div>
            <Button asChild>
              <Link to='/community/submit'>Create Discussion</Link>
            </Button>
          </div>
          <div className='space-y-5'>
            {loaderData.posts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                author={post.author.name}
                authorAvatarUrl={post.author.avatar}
                category={post.topic.name}
                postedAt={post.created_at}
                votesCount={post.upvotes[0].count}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className='flex flex-col col-span-2 space-y-5'>
          <span className='text-sm font-bold text-muted-foreground uppercase'>Topics</span>
          <div className='flex flex-col gap-4 items-start'>
            {loaderData.topics.map((topic) => (
              <Button asChild variant='link' key={topic.slug} className='pl-0'>
                <Link className='font-semibold' to={`/community?topic=${topic.slug}`}>
                  {topic.name}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
