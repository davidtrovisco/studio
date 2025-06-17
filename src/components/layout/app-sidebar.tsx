
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  Package2,
  ScanLine,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

const navItemLabels: Record<string, Record<SupportedLanguage, string>> = {
  Dashboard: { en: 'Dashboard', pt: 'Painel', es: 'Tablero' },
  Invoices: { en: 'Invoices', pt: 'Faturas', es: 'Facturas' },
  Clients: { en: 'Clients', pt: 'Clientes', es: 'Clientes' },
  Reports: { en: 'Reports', pt: 'Relatórios', es: 'Informes' },
  'Smart Reminders': { en: 'Smart Reminders', pt: 'Lembretes Inteligentes', es: 'Recordatorios Inteligentes' },
  'Reconhecimento OCR': { en: 'OCR Scan', pt: 'Reconhecimento OCR', es: 'Escaneo OCR' },
  Subscription: { en: 'Subscription', pt: 'Assinatura', es: 'Suscripción' },
  Settings: { en: 'Settings', pt: 'Configurações', es: 'Configuración' },
  Logout: { en: 'Logout', pt: 'Sair', es: 'Cerrar Sesión' },
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();

  const getTranslatedLabel = (key: string) => navItemLabels[key]?.[language] || key;

  const navItems = [
    { href: '/dashboard', labelKey: 'Dashboard', icon: Home },
    { href: '/invoices', labelKey: 'Invoices', icon: FileText },
    { href: '/clients', labelKey: 'Clients', icon: Users },
    { href: '/reports', labelKey: 'Reports', icon: BarChart3 },
    { href: '/smart-reminders', labelKey: 'Smart Reminders', icon: Sparkles },
    { href: '/ocr-scan', labelKey: 'Reconhecimento OCR', icon: ScanLine },
    { href: '/subscriptions', labelKey: 'Subscription', icon: CreditCard },
  ];

  const bottomNavItems = [
    { href: '/settings', labelKey: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg text-sidebar-foreground hover:text-sidebar-primary transition-colors">
          <Package2 className="h-7 w-7 text-primary" />
          <span className="group-data-[collapsible=icon]:hidden">InvoiceFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: getTranslatedLabel(item.labelKey), side: 'right', align: 'center' }}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{getTranslatedLabel(item.labelKey)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={{ children: getTranslatedLabel(item.labelKey), side: 'right', align: 'center' }}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{getTranslatedLabel(item.labelKey)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={{ children: getTranslatedLabel('Logout'), side: 'right', align: 'center' }}
              className="justify-start text-red-500 hover:bg-red-500/10 hover:text-red-400"
              onClick={() => router.push('/logout-success')}
            >
                <LogOut className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{getTranslatedLabel('Logout')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
