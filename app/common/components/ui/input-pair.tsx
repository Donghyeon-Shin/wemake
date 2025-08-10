import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { Textarea } from '~/common/components/ui/textarea';

export function InputPair({
  label,
  description,
  textarea,
  ...rest
}: {
  label: string;
  description: string;
  textarea?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className='space-y-2 flex flex-col'>
      <Label htmlFor={rest.id} className='flex flex-col items-start justify-start'>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      {textarea ? <Textarea rows={4} {...rest} className='resize-none' /> : <Input {...rest} />}
    </div>
  );
}
