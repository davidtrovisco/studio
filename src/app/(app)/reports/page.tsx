'use client';

import { PageTitle } from '@/components/shared/page-title';
import { ReportChart } from '@/components/reports/report-chart';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';

// Placeholder data for charts
const monthlyRevenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const expenseData = [
  { category: 'Software', expenses: 500 },
  { category: 'Marketing', expenses: 1200 },
  { category: 'Office', expenses: 300 },
  { category: 'Travel', expenses: 800 },
];

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const expenseChartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;


export default function ReportsPage() {
  const handleExportCSV = (reportType: string) => {
    // TODO: Implement CSV export logic
    console.log(`Exporting ${reportType} report to CSV...`);
  };

  return (
    <>
      <PageTitle title="Financial Reports" />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <ReportChart
            title="Monthly Revenue"
            description="Overview of your revenue month by month."
            data={monthlyRevenueData}
            dataKey="revenue"
            xAxisKey="month"
            chartConfig={revenueChartConfig}
          />
          <Button variant="outline" className="mt-4" onClick={() => handleExportCSV('monthly_revenue')}>
            <Download className="mr-2 h-4 w-4" /> Export Revenue CSV
          </Button>
        </div>
        <div>
          <ReportChart
            title="Expense Breakdown"
            description="Summary of your expenses by category."
            data={expenseData}
            dataKey="expenses"
            xAxisKey="category"
            chartConfig={expenseChartConfig}
          />
          <Button variant="outline" className="mt-4" onClick={() => handleExportCSV('expense_breakdown')}>
            <Download className="mr-2 h-4 w-4" /> Export Expenses CSV
          </Button>
        </div>
      </div>
    </>
  );
}
