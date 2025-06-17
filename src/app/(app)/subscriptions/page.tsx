import { PageTitle } from '@/components/shared/page-title';
import { PlanCard } from '@/components/subscriptions/plan-card';
import { placeholderSubscriptionPlans } from '@/lib/placeholder-data';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from 'lucide-react';

export default function SubscriptionsPage() {
  const handleChoosePlan = (planId: string) => {
    // TODO: Implement plan selection logic (e.g., redirect to Stripe checkout)
    console.log(`User chose plan: ${planId}`);
  };

  const currentPlan = placeholderSubscriptionPlans.find(p => p.isCurrent);

  return (
    <>
      <PageTitle title="Subscription Plans" />
      
      {currentPlan && (
        <Alert className="mb-6 bg-accent/30 border-accent text-accent-foreground">
          <Info className="h-4 w-4 !text-accent-foreground" />
          <AlertTitle>Your Current Plan: {currentPlan.name}</AlertTitle>
          <AlertDescription>
            You are currently on the {currentPlan.name}. You can upgrade or manage your subscription below.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {placeholderSubscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onChoosePlan={handleChoosePlan} />
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Prices are in USD. Payment processing is handled securely by our partners.</p>
        <p>You can cancel or change your plan at any time.</p>
      </div>
    </>
  );
}
