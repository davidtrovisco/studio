import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import type { SubscriptionPlan } from '@/types';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onChoosePlan?: (planId: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export function PlanCard({ plan, onChoosePlan }: PlanCardProps) {
  return (
    <Card className={cn("flex flex-col", plan.isCurrent && "border-primary ring-2 ring-primary")}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
        <CardDescription>{plan.id === 'free' ? 'Perfect for getting started' : 'For growing businesses'}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="text-4xl font-bold">
          {plan.priceMonthly === 0 ? 'Free' : formatCurrency(plan.priceMonthly)}
          {plan.priceMonthly !== 0 && <span className="text-sm font-normal text-muted-foreground">/month</span>}
        </div>
        {plan.priceYearly > 0 && plan.priceMonthly > 0 && (
            <p className="text-sm text-muted-foreground">
                or {formatCurrency(plan.priceYearly)}/year (Save {formatCurrency(plan.priceMonthly * 12 - plan.priceYearly)})
            </p>
        )}
        <ul className="space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {plan.isCurrent ? (
          <Button disabled className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Current Plan
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={() => onChoosePlan && onChoosePlan(plan.id)}
            variant={plan.id === 'premium' ? 'default' : 'outline'}
          >
            {plan.id === 'free' ? 'Continue with Free' : 'Choose Plan'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
