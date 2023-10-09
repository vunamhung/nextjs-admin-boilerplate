import type { FC, MouseEventHandler, ReactNode } from 'react';
import type { ButtonProps, PopoverProps } from '@mantine/core';
import Link from 'next/link';
import { Button, Popover, UnstyledButton } from '@mantine/core';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface EditButtonProps extends ButtonProps {
  href: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const EditButton: FC<EditButtonProps> = ({ children, href, disabled, ...buttonProps }) => {
  if (disabled) {
    return (
      <UnstyledButton className="flex items-center gap-1 text-gray-500" disabled>
        <FiEdit />
        {children}
      </UnstyledButton>
    );
  }

  return (
    <Link href={href}>
      <Button leftIcon={children && <FiEdit size={16} />} size="xs" variant="subtle" {...buttonProps}>
        {children || <FiEdit size={16} />}
      </Button>
    </Link>
  );
};

interface DeleteButtonProps extends ButtonProps {
  onClick: MouseEventHandler;
  position?: PopoverProps['position'];
  disabled?: boolean;
  children?: ReactNode;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ children, onClick, position = 'bottom', ...buttonProps }) => {
  return (
    <Popover position={position} withArrow shadow="md">
      <Popover.Target>
        <Button type="button" color="red" leftIcon={children && <FiTrash2 size={16} />} {...buttonProps}>
          {children || <FiTrash2 size={16} />}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="px-2 py-1 text-sm">
        Are You Sure,{' '}
        <button className="bg-white text-red-500" type="button" onClick={onClick}>
          Yes
        </button>
      </Popover.Dropdown>
    </Popover>
  );
};
