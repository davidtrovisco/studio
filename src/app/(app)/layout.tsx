
'use client'; 

import type { ReactNode } from 'react';
import { useState } from 'react'; 
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { ProfileProvider } from '@/contexts/profile-context';
import { LanguageProvider } from '@/contexts/language-context'; // Added
import { cn } from '@/lib/utils'; 

export default function AppLayout({ children }: { children: ReactNode }) {
  const [mainBgClass, setMainBgClass] = useState('bg-background'); 

  return (
    <ProfileProvider>
      <LanguageProvider> {/* Added LanguageProvider */}
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <AppHeader 
                currentBgClass={mainBgClass}
                onBgChange={setMainBgClass} 
              />
              <main className={cn("flex-1 p-4 md:p-6 lg:p-8", mainBgClass)}>
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </LanguageProvider> {/* Added LanguageProvider */}
    </ProfileProvider>
  );
}
