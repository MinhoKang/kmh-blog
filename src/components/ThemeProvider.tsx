"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  forcedTheme?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedThemeProvider = NextThemesProvider as any;

export function ThemeProvider({ children, ...props }: Props) {
  return (
    <TypedThemeProvider 
      {...props}
      enableSystem={false}
      defaultTheme="light"
      themes={['light', 'dark']}
    >
      {children}
    </TypedThemeProvider>
  );
}