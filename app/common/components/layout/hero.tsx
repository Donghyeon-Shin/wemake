import { cn } from '~/lib/utils';

export type HeroProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function Hero({ title, subtitle, className }: HeroProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10 py-20',
        className,
      )}
    >
      <h1 className={cn('text-5xl font-bold')}>{title}</h1>
      {subtitle ? <p className={cn('text-2xl font-light text-foreground')}>{subtitle}</p> : null}
    </div>
  );
}
