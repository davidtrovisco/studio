import { PageTitle } from '@/components/shared/page-title';
import { ReminderForm } from '@/components/smart-reminders/reminder-form';

export default function SmartRemindersPage() {
  return (
    <>
      <PageTitle title="Smart Invoice Reminders" />
      <ReminderForm />
    </>
  );
}
