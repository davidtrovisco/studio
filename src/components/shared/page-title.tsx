
'use client'; // Converted to Client Component

import type { ReactNode } from 'react';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

interface PageTitleProps {
  title: string; // This will now act as a key for translation
  children?: ReactNode; 
}

const translations: Record<string, Record<SupportedLanguage, string>> = {
  "Dashboard": { en: "Dashboard", pt: "Painel", es: "Tablero" },
  "Invoices": { en: "Invoices", pt: "Faturas", es: "Facturas" },
  "Clients": { en: "Clients", pt: "Clientes", es: "Clientes" },
  "Reports": { en: "Financial Reports", pt: "Relatórios Financeiros", es: "Reportes Financieros" },
  "Smart Invoice Reminders": { en: "Smart Invoice Reminders", pt: "Lembretes Inteligentes de Fatura", es: "Recordatorios Inteligentes de Factura" },
  "Reconhecimento de Notas (OCR)": { en: "OCR Invoice Scanning", pt: "Reconhecimento de Notas (OCR)", es: "Escaneo OCR de Facturas" },
  "Subscription Plans": { en: "Subscription Plans", pt: "Planos de Assinatura", es: "Planes de Suscripción" },
  "Settings": { en: "Settings", pt: "Configurações", es: "Configuración" },
  "Create New Invoice": { en: "Create New Invoice", pt: "Criar Nova Fatura", es: "Crear Nueva Factura" },
  "Add New Client": { en: "Add New Client", pt: "Adicionar Novo Cliente", es: "Añadir Nuevo Cliente" },
};

export function PageTitle({ title, children }: PageTitleProps) {
  const { language } = useLanguage();
  
  const translatedTitle = translations[title]?.[language] || title;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl font-headline">
        {translatedTitle}
      </h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
