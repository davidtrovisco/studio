
'use client'; // Converted to Client Component

import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { placeholderInvoices } from '@/lib/placeholder-data';
import type { Invoice } from '@/types';
import { DollarSign, FileText, AlertTriangle, TrendingUp } from 'lucide-react'; // Added TrendingUp
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getStatusBadgeVariant = (status: Invoice['status']) => {
  switch (status) {
    case 'paid': return 'default'; 
    case 'sent': return 'secondary';
    case 'overdue': return 'destructive';
    case 'draft': return 'outline';
    default: return 'outline';
  }
};

const cardTitleTranslations: Record<string, Record<SupportedLanguage, string>> = {
  "Total Revenue": { en: "Total Revenue", pt: "Receita Total", es: "Ingresos Totales" },
  "Pending Amount": { en: "Pending Amount", pt: "Valor Pendente", es: "Monto Pendiente" },
  "Overdue Invoices": { en: "Overdue Invoices", pt: "Faturas Vencidas", es: "Facturas Vencidas" },
  "Sales Forecast": { en: "Sales Forecast", pt: "Previsão de Vendas", es: "Previsión de Ventas" },
  "Recent Invoices": { en: "Recent Invoices", pt: "Faturas Recentes", es: "Facturas Recientes" },
};

const cardDescriptionTranslations: Record<string, Record<SupportedLanguage, string>> = {
  "recentInvoices": { en: "A quick look at your latest invoices.", pt: "Uma olhada rápida nas suas últimas faturas.", es: "Un vistazo rápido a sus últimas facturas." },
  "totalRevenue": { en: "+20.1% from last month", pt: "+20.1% do mês passado", es: "+20.1% desde el mes pasado" },
  "pendingAmount": { en: "Across active invoices", pt: "Em faturas ativas", es: "En facturas activas" },
  "overdueInvoices": { en: "Require immediate attention", pt: "Requerem atenção imediata", es: "Requieren atención inmediata" },
  "salesForecast": { en: "Estimate for next month", pt: "Estimativa para o próximo mês", es: "Estimación para el próximo mes" },
  "salesForecastInsight": { en: "+15% from monthly average", pt: "+15% em relação à média mensal", es: "+15% sobre el promedio mensual" },
};


export default function DashboardPage() {
  const { language } = useLanguage(); 

  const recentInvoices = placeholderInvoices.slice(0, 5);
  const totalRevenue = placeholderInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingAmount = placeholderInvoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const overdueCount = placeholderInvoices.filter(inv => inv.status === 'overdue').length;
  const simulatedSalesForecast = 2500; // Simulated data

  const getTranslatedCardTitle = (key: string) => cardTitleTranslations[key]?.[language] || key;
  const getTranslatedCardDescription = (key: string) => cardDescriptionTranslations[key]?.[language] || key;


  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6"> {/* Updated grid to lg:grid-cols-4 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getTranslatedCardTitle("Total Revenue")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">{getTranslatedCardDescription("totalRevenue")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getTranslatedCardTitle("Pending Amount")}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">{getTranslatedCardDescription("pendingAmount")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getTranslatedCardTitle("Overdue Invoices")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">{getTranslatedCardDescription("overdueInvoices")}</p>
          </CardContent>
        </Card>
        <Card> {/* New Sales Forecast Card */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{getTranslatedCardTitle("Sales Forecast")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(simulatedSalesForecast)}</div>
            <p className="text-xs text-muted-foreground">{getTranslatedCardDescription("salesForecastInsight")}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getTranslatedCardTitle("Recent Invoices")}</CardTitle>
          <CardDescription>{getTranslatedCardDescription("recentInvoices")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.client.name}</TableCell>
                  <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(invoice.status)} className="capitalize">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/invoices/${invoice.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
