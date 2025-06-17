import { PageTitle } from '@/components/shared/page-title';
import { InvoiceForm } from '@/components/invoices/invoice-form';
import { placeholderClients } from '@/lib/placeholder-data';
import { Card, CardContent } from '@/components/ui/card';

export default function NewInvoicePage() {
  const handleSubmit = (data: any) => {
    // TODO: Implement actual invoice creation logic
    console.log('New invoice data:', data);
    // Redirect or show success message
  };

  return (
    <>
      <PageTitle title="Create New Invoice" />
      <Card>
        <CardContent className="pt-6">
            <InvoiceForm onSubmit={handleSubmit} clients={placeholderClients} />
        </CardContent>
      </Card>
    </>
  );
}
