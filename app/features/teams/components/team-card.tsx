import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';

export interface TeamCardProps {
  id: string;
  leaderName: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
  className?: string;
}

export function TeamCard({
  id,
  leaderName,
  leaderAvatarUrl,
  positions,
  projectDescription,
  className,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className={`bg-transparent hover:bg-transparent transition-colors ${className || ''}`}>
        <CardHeader className='flex flex-row items-center'>
          <CardTitle className='text-base leading-loose'>
            <Badge variant='secondary' className='inline-flex shadow-sm items-center text-base'>
              <span>@{leaderName}</span>
              <Avatar className='size-4'>
                <AvatarImage src={leaderAvatarUrl} />
                <AvatarFallback>{leaderName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Badge>
            <span className='text-base'> is looking for</span>
            {positions.map((position, index) => (
              <Badge key={index} className='text-base'>
                {position}
              </Badge>
            ))}
            <span> to build</span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className='justify-end'>
          <Button variant='link'>Join Team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
