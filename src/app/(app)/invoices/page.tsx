import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/shared/page-title';
import { InvoicesDataTable } from '@/components/invoices/invoices-data-table';
import { placeholderInvoices } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Invoice } from '@/types';

export default function InvoicesPage() {
  const allInvoices = placeholderInvoices;
  const draftInvoices = allInvoices.filter(inv => inv.status === 'draft');
  const sentInvoices = allInvoices.filter(inv => inv.status === 'sent');
  const paidInvoices = allInvoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = allInvoices.filter(inv => inv.status === 'overdue');

  const tabs: { value: string, label: string, data: Invoice[] }[] = [
    { value: "all", label: "All Invoices", data: allInvoices },
    { value: "draft", label: "Drafts", data: draftInvoices },
    { value: "sent", label: "Sent", data: sentInvoices },
    { value: "paid", label: "Paid", data: paidInvoices },
    { value: "overdue", label: "Overdue", data: overdueInvoices },
  ];

  return (
    <>
      <PageTitle title="Invoices">
        <Button asChild>
          <Link href="/invoices/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Invoice
          </Link>
        </Button>
      </PageTitle>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label} ({tab.data.length})
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
             <InvoicesDataTable data={tab.data} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
