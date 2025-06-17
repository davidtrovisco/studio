import type { ReactNode } from 'react';
import { Package2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-semibold text-primary">
        <Package2 className="h-8 w-8" />
        <span>InvoiceFlow</span>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
