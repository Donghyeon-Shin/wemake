import { useState } from 'react';
import { Label } from '~/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/common/components/ui/select';

export function SelectPair({
  name,
  required,
  label,
  placeholder,
  options,
  description,
}: {
  name: string;
  required: boolean;
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className='space-y-2 flex flex-col'>
      <Label className='flex flex-col items-start justify-start' onClick={() => setOpen(true)}>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      <Select open={open} onOpenChange={setOpen} name={name} required={required}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
