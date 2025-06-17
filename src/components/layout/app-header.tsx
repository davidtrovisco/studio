
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
import { Palette } from 'lucide-react'; // Added Palette icon
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
          <Palette className="h-5 w-5 text-muted-foreground" /> 
          <Select value={currentBgClass} onValueChange={onBgChange}>
            <SelectTrigger 
              id="bg-selector" 
              className="w-[150px] h-9"
              aria-label="Background color" // Added aria-label
            >
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
