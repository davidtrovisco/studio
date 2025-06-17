'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized invoice reminder suggestions
 * based on client payment behavior.
 *
 * - generateInvoiceReminderSuggestion - A function that generates an invoice reminder suggestion.
 * - InvoiceReminderSuggestionInput - The input type for the generateInvoiceReminderSuggestion function.
 * - InvoiceReminderSuggestionOutput - The return type for the generateInvoiceReminderSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceReminderSuggestionInputSchema = z.object({
  clientName: z.string().describe('The name of the client.'),
  invoiceNumber: z.string().describe('The invoice number.'),
  invoiceDueDate: z.string().describe('The invoice due date (YYYY-MM-DD).'),
  invoiceAmount: z.number().describe('The invoice amount.'),
  paymentHistory: z
    .string()
    .describe(
      'A summary of the client’s payment history, including on-time payments, late payments, and any payment issues.'
    ),
});
export type InvoiceReminderSuggestionInput = z.infer<typeof InvoiceReminderSuggestionInputSchema>;

const InvoiceReminderSuggestionOutputSchema = z.object({
  reminderSuggestion: z
    .string()
    .describe('A personalized invoice reminder suggestion based on the client’s payment behavior.'),
});
export type InvoiceReminderSuggestionOutput = z.infer<typeof InvoiceReminderSuggestionOutputSchema>;

export async function generateInvoiceReminderSuggestion(
  input: InvoiceReminderSuggestionInput
): Promise<InvoiceReminderSuggestionOutput> {
  return invoiceReminderSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'invoiceReminderSuggestionPrompt',
  input: {schema: InvoiceReminderSuggestionInputSchema},
  output: {schema: InvoiceReminderSuggestionOutputSchema},
  prompt: `You are an AI assistant specializing in crafting personalized invoice reminder messages.

  Based on the client's payment history and the details of the current invoice, generate a friendly but firm reminder message.
  Consider the following information when creating the reminder:

  Client Name: {{{clientName}}}
  Invoice Number: {{{invoiceNumber}}}
  Invoice Due Date: {{{invoiceDueDate}}}
  Invoice Amount: {{{invoiceAmount}}}
  Payment History: {{{paymentHistory}}}

  Reminder Suggestion:`,
});

const invoiceReminderSuggestionFlow = ai.defineFlow(
  {
    name: 'invoiceReminderSuggestionFlow',
    inputSchema: InvoiceReminderSuggestionInputSchema,
    outputSchema: InvoiceReminderSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
