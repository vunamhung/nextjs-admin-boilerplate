import React from 'react';
import Link from 'next/link';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase } from '@tabler/icons';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

function MainLink({ icon, color, label, path }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">
          <Link className="text-black no-underline" href={path}>
            {label}
          </Link>
        </Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <IconGitPullRequest size={16} />, color: 'blue', label: 'Pull Requests', path: '/' },
  { icon: <IconGitPullRequest size={16} />, color: 'blue', label: 'Pull Requests', path: '/pull' },
  { icon: <IconAlertCircle size={16} />, color: 'teal', label: 'Open Issues', path: '/pull' },
  { icon: <IconMessages size={16} />, color: 'violet', label: 'Discussions', path: '/pull' },
  { icon: <IconDatabase size={16} />, color: 'grape', label: 'Databases', path: '/pull' },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
