interface iWrapper {
  title: string;
  className?: string;
  withBack?: boolean;
  showLoading?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}
