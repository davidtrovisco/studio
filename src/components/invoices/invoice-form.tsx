
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, PlusCircle, Trash2, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { Invoice, Client, InvoiceItem as InvoiceItemType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image'; // Import next/image
import { useProfile } from '@/contexts/profile-context'; // Import useProfile

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().min(0.01, 'Quantity must be positive'),
  unitPrice: z.coerce.number().min(0, 'Unit price cannot be negative'),
});

const invoiceFormSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  issueDate: z.date({ required_error: 'Issue date is required.' }),
  dueDate: z.date({ required_error: 'Due date is required.' }),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  taxRate: z.coerce.number().min(0).max(100).optional().default(0),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface InvoiceFormProps {
  initialData?: Partial<Invoice>; // For editing
  onSubmit: (data: InvoiceFormValues) => void;
  clients: Client[];
}

const defaultItem: Omit<InvoiceItemType, 'id' | 'total'> = {
  description: '',
  quantity: 1,
  unitPrice: 0,
};

export function InvoiceForm({ initialData, onSubmit, clients }: InvoiceFormProps) {
  const { avatarPreview, companyName } = useProfile(); // Get avatarPreview and companyName from context

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientId: initialData?.client?.id || '',
      invoiceNumber: initialData?.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`,
      issueDate: initialData?.issueDate ? new Date(initialData.issueDate) : new Date(),
      dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : new Date(new Date().setDate(new Date().getDate() + 30)),
      items: initialData?.items?.map(item => ({ description: item.description, quantity: item.quantity, unitPrice: item.unitPrice })) || [defaultItem],
      notes: initialData?.notes || '',
      taxRate: initialData?.taxRate ? initialData.taxRate * 100 : 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const watchItems = form.watch('items');
  const watchTaxRate = form.watch('taxRate') || 0;

  const subtotal = React.useMemo(() => {
    return watchItems.reduce((acc, item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      return acc + quantity * unitPrice;
    }, 0);
  }, [watchItems]);

  const taxAmount = React.useMemo(() => {
    return subtotal * (watchTaxRate / 100);
  }, [subtotal, watchTaxRate]);

  const totalAmount = React.useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            {avatarPreview && (
              <div className="relative h-20 w-20 mb-2 rounded-md overflow-hidden border">
                <Image src={avatarPreview} alt={companyName || "Company Logo"} layout="fill" objectFit="contain" data-ai-hint="logo company" />
              </div>
            )}
            <h2 className="text-xl font-semibold">{companyName || 'Your Company'}</h2>
            {/* Placeholder for company address if available from profile/settings */}
          </div>
          <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Issue Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                 <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4 last:border-b-0">
                <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-5">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Service or product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Unit Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                     <FormLabel className={cn(index !== 0 && "sr-only", "block mb-2")}>Total</FormLabel>
                    <p className="py-2 h-10">
                        {formatCurrency((watchItems[index]?.quantity || 0) * (watchItems[index]?.unitPrice || 0))}
                    </p>
                </div>
                <div className="md:col-span-1">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Remove item</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(defaultItem)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
            {form.formState.errors.items && !form.formState.errors.items.root && (
                 <FormMessage>{form.formState.errors.items.message}</FormMessage>
            )}
             {form.formState.errors.items?.root && (
                <FormMessage>{form.formState.errors.items.root.message}</FormMessage>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                <FormItem className="md:col-span-2">
                    <FormLabel>Notes / Terms</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Optional: Payment terms, thank you note, etc."
                        className="resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="taxRate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g. 8 for 8%" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Separator />
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax ({watchTaxRate}%):</span>
                        <span>{formatCurrency(taxAmount)}</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between font-semibold text-base">
                        <span>Total Amount:</span>
                        <span>{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </div>
        </div>


        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" /> Save and Send
          </Button>
        </div>
      </form>
    </Form>
  );
}

