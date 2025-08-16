import { useState } from 'react';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/ui/input-pair';
import { SelectPair } from '~/common/components/ui/select-pair';
import { Button } from '../../../common/components/ui/button';
import { Input } from '../../../common/components/ui/input';
import { Label } from '../../../common/components/ui/label';

export default function Settings() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const onIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className='space-y-20'>
      <div className='grid grid-cols-6 gap-40'>
        <div className='col-span-4 flex flex-col gap-10'>
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form className='flex flex-col w-1/2 gap-5'>
            <InputPair
              label='Name'
              description='Your public display name.'
              required
              id='name'
              name='name'
              placeholder='John Doe'
            />
            <SelectPair
              label='Role'
              description='What role do you do identify the most with'
              placeholder='Select your role'
              required
              name='role'
              options={[
                { label: 'Developer', value: 'developer' },
                { label: 'Designer', value: 'designer' },
                { label: 'Entrepreneur', value: 'entrepreneur' },
                { label: 'Investor', value: 'investor' },
              ]}
            />
            <InputPair
              label='Headline'
              description='An introduction to your profile.'
              id='headline'
              name='headline'
              placeholder='I am a software engineer...'
              required
              textarea
            />
            <InputPair
              label='Bio'
              description='Your public bio.'
              id='bio'
              name='bio'
              placeholder='I am a software engineer...'
              required
              textarea
            />
            <InputPair
              label='Bio'
              description='Your public bio.'
              id='bio'
              name='bio'
              placeholder='I am a software engineer...'
              required
              textarea
            />
            <Button className='w-full'>Update</Button>
          </Form>
        </div>
        <aside className='col-span-2 p-6 rounded-lg border shadow-md'>
          <Label className='flex flex-col items-start justify-start gap-1'>
            Avatar
            <small className='text-muted-foreground'>This is your public avatar</small>
          </Label>
          <div className='space-y-5'>
            <div className='size-40 rounded-full shadow-xl overflow-hidden'>
              {avatar ? <img src={avatar} alt='avatar' className='object-cover size-full' /> : null}
            </div>
            <Input type='file' className='w-1/2' onChange={onIconChange} required name='avatar' />
            <div className='flex flex-col text-xs'>
              <span className='text-muted-foreground'>Recommended size: 128x128px</span>
              <span className='text-muted-foreground'>Allowed formats: PNG, JPEG</span>
              <span className='text-muted-foreground'>Max file size: 1MB</span>
            </div>
          </div>
          <Button className='w-full'>Update</Button>
        </aside>
      </div>
    </div>
  );
}
