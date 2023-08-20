import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';
import { DeleteButton, Wrapper } from '@/components';
import { http } from '@/utilities';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

interface props extends iWrapper {
  onSubmit: any;
  withDelete?: [string, string];
}

export const UpdateWrapper: FC<props> = ({ onSubmit, withDelete, ...props }) => {
  const { push } = useRouter();

  return (
    <form onSubmit={onSubmit}>
      <Wrapper
        {...props}
        actions={
          <>
            {withDelete && (
              <DeleteButton
                onClick={() => {
                  http.delete(withDelete[0], { data: [withDelete[1]] }).then(() => {
                    toast.success('Item Deleted');
                    push(withDelete[0]);
                  });
                }}
              />
            )}
            <Button type="submit" leftIcon={<FiSave size={18} />}>
              Save
            </Button>
          </>
        }
      />
    </form>
  );
};
