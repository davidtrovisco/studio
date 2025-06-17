import type { Client, Invoice, SubscriptionPlan, InvoiceStatus } from '@/types';

export const placeholderClients: Client[] = [
  { id: '1', name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', phone: '555-0101', address: '123 Tech Park, Silicon Valley, CA' },
  { id: '2', name: 'Creative Designs Co.', email: 'hello@creativedesigns.co', phone: '555-0102', address: '456 Art Lane, New York, NY' },
  { id: '3', name: 'GreenLeaf Landscaping', email: 'info@greenleaf.com', phone: '555-0103', address: '789 Garden St, Miami, FL' },
];

export const placeholderInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV001',
    client: placeholderClients[0],
    issueDate: new Date('2023-10-01').toISOString(),
    dueDate: new Date('2023-10-15').toISOString(),
    items: [
      { id: 'item-1', description: 'Web Development Services', quantity: 1, unitPrice: 1200, total: 1200 },
      { id: 'item-2', description: 'Consulting Hours', quantity: 5, unitPrice: 100, total: 500 },
    ],
    subtotal: 1700,
    taxRate: 0.08, // 8%
    taxAmount: 136,
    totalAmount: 1836,
    status: 'paid' as InvoiceStatus,
    notes: 'Thank you for your business!',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV002',
    client: placeholderClients[1],
    issueDate: new Date('2023-10-05').toISOString(),
    dueDate: new Date('2023-10-20').toISOString(),
    items: [
      { id: 'item-3', description: 'Logo Design Package', quantity: 1, unitPrice: 800, total: 800 },
    ],
    subtotal: 800,
    totalAmount: 800,
    status: 'sent' as InvoiceStatus,
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV003',
    client: placeholderClients[2],
    issueDate: new Date('2023-09-20').toISOString(),
    dueDate: new Date('2023-10-05').toISOString(),
    items: [
      { id: 'item-4', description: 'Monthly Garden Maintenance', quantity: 1, unitPrice: 250, total: 250 },
    ],
    subtotal: 250,
    totalAmount: 250,
    status: 'overdue' as InvoiceStatus,
  },
   {
    id: 'inv-004',
    invoiceNumber: 'INV004',
    client: placeholderClients[0],
    issueDate: new Date('2023-11-01').toISOString(),
    dueDate: new Date('2023-11-15').toISOString(),
    items: [
      { id: 'item-5', description: 'Cloud Hosting - Nov', quantity: 1, unitPrice: 50, total: 50 },
    ],
    subtotal: 50,
    totalAmount: 50,
    status: 'draft' as InvoiceStatus,
  },
];

export const placeholderSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['Up to 5 invoices/month', 'Basic reporting', 'Client management'],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    priceMonthly: 19,
    priceYearly: 190,
    features: ['Unlimited invoices', 'Advanced reporting', 'Custom invoice templates', 'Priority support', 'Smart reminders'],
    isCurrent: true, // Example: user is on premium
  },
];
