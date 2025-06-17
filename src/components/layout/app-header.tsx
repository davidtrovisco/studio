
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
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette, Languages } from 'lucide-react'; 
import type { Dispatch, SetStateAction } from 'react';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context'; // Added

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
  const { setLanguage } = useLanguage(); // Added

  const handleLanguageChange = (language: SupportedLanguage) => { // Updated
    setLanguage(language);
    console.log(`Language selected: ${language}`);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Change language">
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('es')}>Español</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('pt')}>Português</DropdownMenuItem>
            {/* Add more languages as needed */}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-muted-foreground" />
          <Select value={currentBgClass} onValueChange={onBgChange}>
            <SelectTrigger
              id="bg-selector"
              className="w-[150px] h-9"
              aria-label="Background color"
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
