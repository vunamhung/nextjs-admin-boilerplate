import type { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily:
    'YuGothic, "Yu Gothic", -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  colors: {
    gray: ['#f5f5f4', '#efefef', '#d6d3d2', '#bab6b5', '#a7a2a0', '#7f7776', '#6a6462', '#55504e', '#3e3a39'],
    blue: ['#eef7fc', '#dceff9', '#b9e0f3', '#96d0e9', '#73c1e7', '#51b1e1', '#299fdb', '#218bc0', '#1b729d'],
  },
  defaultRadius: 5,
  components: {
    Button: {
      defaultProps: { size: 'md', color: 'blue', radius: 8 },
      variants: {
        outline: (theme) => ({
          root: {
            ...theme.fn.hover({ backgroundColor: theme.colors.blue[0] }),
          },
        }),
      },
      styles: () => ({
        label: { fontWeight: 400 },
      }),
    },
    Table: { defaultProps: { fontSize: 'md' } },
    Modal: { defaultProps: { radius: 'md' }, styles: { root: { zIndex: 999 } } },
  },
  globalStyles: (theme) => ({
    '.mantine-Input-input,.mantine-DateTimePicker-input,.mantine-DatePicker-input': { borderColor: theme.colors.gray[2] },
    body: { color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7] },
  }),
};
