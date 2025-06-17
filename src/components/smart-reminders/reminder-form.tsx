'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Copy, Send, RotateCcw } from 'lucide-react';
import type { InvoiceReminderSuggestionInput } from '@/ai/flows/invoice-reminder-suggestions';
import { generateInvoiceReminderSuggestion } from '@/ai/flows/invoice-reminder-suggestions';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';


const reminderFormSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDueDate: z.date({ required_error: 'Invoice due date is required' }),
  invoiceAmount: z.coerce.number().positive('Invoice amount must be positive'),
  paymentHistory: z.string().min(1, 'Payment history summary is required'),
});

type ReminderFormValues = z.infer<typeof reminderFormSchema>;

export function ReminderForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      clientName: '',
      invoiceNumber: '',
      invoiceDueDate: undefined,
      invoiceAmount: undefined,
      paymentHistory: '',
    },
  });

  async function onSubmit(data: ReminderFormValues) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const input: InvoiceReminderSuggestionInput = {
        ...data,
        invoiceDueDate: format(data.invoiceDueDate, 'yyyy-MM-dd'),
      };
      const result = await generateInvoiceReminderSuggestion(input);
      setSuggestion(result.reminderSuggestion);
    } catch (error) {
      console.error('Error generating reminder:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Reminder',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion);
      toast({ title: 'Copied to clipboard!' });
    }
  };
  
  const handleSend = () => {
    if (suggestion) {
       // Placeholder: In a real app, this would open an email client or use an email API
      const mailtoLink = `mailto:?subject=Invoice Reminder: ${form.getValues().invoiceNumber}&body=${encodeURIComponent(suggestion)}`;
      window.location.href = mailtoLink;
      toast({ title: 'Reminder ready to send (opened mail client)' });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Generate Smart Reminder</CardTitle>
            <CardDescription>
              Fill in the details below and let AI craft a personalized invoice reminder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., INV-00123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 250.75" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="invoiceDueDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Invoice Due Date</FormLabel>
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
                        disabled={(date) => date < new Date("1900-01-01")}
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
              name="paymentHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Payment History Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Usually pays on time, but last payment was 3 days late. Has been a client for 2 years."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief summary of the client's payment behavior.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Reminder
                </>
              )}
            </Button>
          </CardContent>
        </form>
      </Form>

      {suggestion && (
        <>
        <CardFooter className="flex-col items-start gap-4 pt-6 border-t">
            <div>
                <h3 className="text-lg font-semibold">Suggested Reminder:</h3>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap bg-secondary p-4 rounded-md">
                {suggestion}
                </p>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
                </Button>
                <Button onClick={handleSend}>
                    <Send className="mr-2 h-4 w-4" /> Send Reminder
                </Button>
            </div>
        </CardFooter>
        </>
      )}
    </Card>
  );
}
