
'use client';

import * as React from 'react';
import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [companyName, setCompanyName] = React.useState<string>("Your Company LLC");
  const [email, setEmail] = React.useState<string>("contact@yourcompany.com");
  const [defaultNotes, setDefaultNotes] = React.useState<string>("Thank you for your business!");
  const [taxId, setTaxId] = React.useState<string>("Your Tax ID");


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleSaveProfile = () => {
    console.log('Saving profile with data:');
    console.log('Company Name:', companyName);
    console.log('Email:', email);
    if (avatarFile) {
      console.log('Avatar to upload:', avatarFile.name);
      // Here you would typically upload avatarFile to your backend/storage
    }
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated.",
    });
  };

  const handleSaveInvoiceSettings = () => {
    console.log('Saving invoice settings with data:');
    console.log('Default Notes:', defaultNotes);
    console.log('Tax ID:', taxId);
    toast({
        title: "Invoice Settings Saved",
        description: "Your invoice customization settings have been updated.",
    });
  };


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
                        <Label htmlFor="avatar-upload-input">Company Logo / Avatar</Label>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={avatarPreview || "https://placehold.co/200x200.png"} alt="Company Logo" data-ai-hint="logo company"/>
                                <AvatarFallback>{companyName?.substring(0,2).toUpperCase() || 'CL'}</AvatarFallback>
                            </Avatar>
                            <input
                                type="file"
                                id="avatar-upload-input"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                            <Label htmlFor="avatar-upload-input" className="cursor-pointer">
                                <Button variant="outline" size="sm" asChild>
                                    <div>
                                        <UploadCloud className="mr-2 h-4 w-4" /> Upload
                                    </div>
                                </Button>
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name">Full Name / Company Name</Label>
                        <Input id="name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" /> Save Profile
                    </Button>
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
                        <Input id="defaultNotes" value={defaultNotes} onChange={(e) => setDefaultNotes(e.target.value)} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="taxId">Default Tax ID / VAT Number</Label>
                        <Input id="taxId" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                    </div>
                    <Button onClick={handleSaveInvoiceSettings}>
                         <Save className="mr-2 h-4 w-4" /> Save Invoice Settings
                    </Button>
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
