import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/shared/page-title';
import { ClientsDataTable } from '@/components/clients/clients-data-table';
import { placeholderClients } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ClientsPage() {
  return (
    <>
      <PageTitle title="Clients">
        <Button asChild>
          <Link href="/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
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
