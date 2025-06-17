import { PageTitle } from '@/components/shared/page-title';
import { ClientForm } from '@/components/clients/client-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewClientPage() {
  const handleSubmit = (data: any) => {
    // TODO: Implement actual client creation logic
    console.log('New client data:', data);
    // Redirect or show success message
  };

  return (
    <>
      <PageTitle title="Add New Client" />
      <Card>
        <CardHeader>
            <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
            <ClientForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </>
  );
}
