
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/shared/page-title';
import { ClientsDataTable } from '@/components/clients/clients-data-table';
import { placeholderClients } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

const translations = {
  addNewClient: { en: 'Add New Client', pt: 'Adicionar Novo Cliente', es: 'Añadir Nuevo Cliente' },
};

export default function ClientsPage() {
  const { language } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][language] || translations[key]['en'];

  return (
    <>
      <PageTitle title="Clients">
        <Button asChild>
          <Link href="/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('addNewClient')}
          </Link>
        </Button>
      </PageTitle>
      <Card>
        <CardContent className="pt-6">
            <ClientsDataTable data={placeholderClients} />
        </CardContent>
      </Card>
    </>
  );
}
