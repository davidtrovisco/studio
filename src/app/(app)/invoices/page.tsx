
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/shared/page-title';
import { InvoicesDataTable } from '@/components/invoices/invoices-data-table';
import { placeholderInvoices } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Invoice } from '@/types';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

const translations = {
  createNewInvoice: { en: 'Create New Invoice', pt: 'Criar Nova Fatura', es: 'Crear Nueva Factura' },
  allInvoices: { en: 'All Invoices', pt: 'Todas as Faturas', es: 'Todas las Facturas' },
  drafts: { en: 'Drafts', pt: 'Rascunhos', es: 'Borradores' },
  sent: { en: 'Sent', pt: 'Enviadas', es: 'Enviadas' },
  paid: { en: 'Paid', pt: 'Pagas', es: 'Pagadas' },
  overdue: { en: 'Overdue', pt: 'Vencidas', es: 'Vencidas' },
};

export default function InvoicesPage() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][language] || translations[key]['en'];

  const allInvoices = placeholderInvoices;
  const draftInvoices = allInvoices.filter(inv => inv.status === 'draft');
  const sentInvoices = allInvoices.filter(inv => inv.status === 'sent');
  const paidInvoices = allInvoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = allInvoices.filter(inv => inv.status === 'overdue');

  const tabsConfig: { value: string, labelKey: keyof typeof translations, data: Invoice[] }[] = [
    { value: "all", labelKey: "allInvoices", data: allInvoices },
    { value: "draft", labelKey: "drafts", data: draftInvoices },
    { value: "sent", labelKey: "sent", data: sentInvoices },
    { value: "paid", labelKey: "paid", data: paidInvoices },
    { value: "overdue", labelKey: "overdue", data: overdueInvoices },
  ];

  return (
    <>
      <PageTitle title="Invoices">
        <Button asChild>
          <Link href="/invoices/new">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('createNewInvoice')}
          </Link>
        </Button>
      </PageTitle>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          {tabsConfig.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {t(tab.labelKey)} ({tab.data.length})
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsConfig.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
             <InvoicesDataTable data={tab.data} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
