export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  // owner_uid: string; // Assuming authentication context provides this
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Client; // or clientId: string and fetch client details
  issueDate: string; // ISO string
  dueDate: string; // ISO string
  items: InvoiceItem[];
  subtotal: number;
  taxRate?: number; // Percentage, e.g., 0.05 for 5%
  taxAmount?: number;
  totalAmount: number;
  status: InvoiceStatus;
  notes?: string;
  // owner_uid: string;
  // pdf_url?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string; // ISO string
  paymentMethod: 'pix' | 'paypal' | 'stripe' | 'bank_transfer' | 'manual';
  // owner_uid: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  isCurrent?: boolean;
}
