
import { config } from 'dotenv';
config();

import '@/ai/flows/invoice-reminder-suggestions.ts';
import '@/ai/flows/extract-invoice-data-flow.ts'; // Added OCR flow
