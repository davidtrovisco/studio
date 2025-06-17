import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  children?: ReactNode; // For actions like buttons on the right
}

export function PageTitle({ title, children }: PageTitleProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl font-headline">
        {title}
      </h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
