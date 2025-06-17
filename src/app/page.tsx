'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check auth status here
    // For now, directly redirect to dashboard
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading InvoiceFlow...</p>
    </div>
  );
}
