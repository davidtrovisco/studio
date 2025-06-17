import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <PageTitle title="Settings" />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="avatar">Company Logo / Avatar</Label>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://placehold.co/200x200.png" alt="Company Logo" data-ai-hint="logo company" />
                                <AvatarFallback>CL</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                                <UploadCloud className="mr-2 h-4 w-4" /> Upload
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name">Full Name / Company Name</Label>
                        <Input id="name" defaultValue="Your Company LLC" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="contact@yourcompany.com" />
                    </div>
                    <Button>Save Profile</Button>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Customization</CardTitle>
                    <CardDescription>Personalize your invoice appearance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="defaultNotes">Default Invoice Notes/Terms</Label>
                        <Input id="defaultNotes" placeholder="Thank you for your business!" />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="taxId">Default Tax ID / VAT Number</Label>
                        <Input id="taxId" placeholder="Your Tax ID" />
                    </div>
                    <Button>Save Invoice Settings</Button>
                </CardContent>
            </Card>

            <Separator className="my-6" />

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your email notification preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm text-muted-foreground">Notification settings (e.g., email for overdue invoices, payment confirmations) will be configurable here.</p>
                   <Button variant="outline" disabled>Manage Notifications (Coming Soon)</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
