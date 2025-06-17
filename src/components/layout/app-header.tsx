
'use client';

import { UserNav } from '@/components/layout/user-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import type { Dispatch, SetStateAction } from 'react';

interface AppHeaderProps {
  className?: string;
  currentBgClass: string;
  onBgChange: Dispatch<SetStateAction<string>>;
}

const backgroundOptions = [
  { value: 'bg-background', label: 'Default Theme' },
  { value: 'bg-white', label: 'White' },
  { value: 'bg-slate-100', label: 'Light Slate' },
  { value: 'bg-sky-50', label: 'Light Sky' },
  { value: 'bg-emerald-50', label: 'Light Emerald' },
];

export function AppHeader({ className, currentBgClass, onBgChange }: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6',
        className
      )}
    >
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* Placeholder for breadcrumbs or page title if needed */}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="bg-selector" className="text-sm text-muted-foreground hidden sm:block">Background:</Label>
          <Select value={currentBgClass} onValueChange={onBgChange}>
            <SelectTrigger id="bg-selector" className="w-[150px] h-9">
              <SelectValue placeholder="Select background" />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <UserNav />
      </div>
    </header>
  );
}
