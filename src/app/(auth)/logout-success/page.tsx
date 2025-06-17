
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, LogIn } from 'lucide-react';

export default function LogoutSuccessPage() {
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="items-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <CardTitle>Logged Out Successfully!</CardTitle>
        <CardDescription>Thank you for using InvoiceFlow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">We hope to see you again soon.</p>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button asChild className="w-full">
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Log Back In
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
