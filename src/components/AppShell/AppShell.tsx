import { useEffect } from 'react';
import { configureNativeShell } from '../../native/configureNativeShell';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    void configureNativeShell();
  }, []);

  return <>{children}</>;
}
