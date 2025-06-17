
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
import { useProfile } from '@/contexts/profile-context';
import { useLanguage, type SupportedLanguage } from '@/contexts/language-context';

const translations = {
  profileTitle: { en: 'Profile', pt: 'Perfil', es: 'Perfil' },
  profileDesc: { en: 'Update your personal information.', pt: 'Atualize suas informações pessoais.', es: 'Actualiza tu información personal.' },
  companyLogoLabel: { en: 'Company Logo / Avatar', pt: 'Logo da Empresa / Avatar', es: 'Logo de la Empresa / Avatar' },
  uploadButton: { en: 'Upload', pt: 'Carregar', es: 'Subir' },
  nameLabel: { en: 'Full Name / Company Name', pt: 'Nome Completo / Nome da Empresa', es: 'Nombre Completo / Nombre de la Empresa' },
  emailLabel: { en: 'Email Address', pt: 'Endereço de Email', es: 'Dirección de Correo Electrónico' },
  saveProfileButton: { en: 'Save Profile', pt: 'Salvar Perfil', es: 'Guardar Perfil' },
  profileSavedToast: { en: 'Profile Saved', pt: 'Perfil Salvo', es: 'Perfil Guardado' },
  profileUpdatedToastDesc: { en: 'Your profile information has been updated.', pt: 'Suas informações de perfil foram atualizadas.', es: 'Tu información de perfil ha sido actualizada.' },
  invoiceCustomizationTitle: { en: 'Invoice Customization', pt: 'Personalização de Fatura', es: 'Personalización de Factura' },
  invoiceCustomizationDesc: { en: 'Personalize your invoice appearance.', pt: 'Personalize a aparência da sua fatura.', es: 'Personaliza la apariencia de tu factura.' },
  defaultNotesLabel: { en: 'Default Invoice Notes/Terms', pt: 'Notas/Termos Padrão da Fatura', es: 'Notas/Términos Predeterminados de la Factura' },
  taxIdLabel: { en: 'Default Tax ID / VAT Number', pt: 'CPF/CNPJ ou Ident. Fiscal Padrão', es: 'ID de Impuestos / NIF Predeterminado' },
  saveInvoiceSettingsButton: { en: 'Save Invoice Settings', pt: 'Salvar Config. da Fatura', es: 'Guardar Config. de Factura' },
  invoiceSettingsSavedToast: { en: 'Invoice Settings Saved', pt: 'Configurações da Fatura Salvas', es: 'Configuración de Factura Guardada' },
  invoiceSettingsUpdatedToastDesc: { en: 'Your invoice customization settings have been updated.', pt: 'Suas configurações de personalização de fatura foram atualizadas.', es: 'Tu configuración de personalización de factura ha sido actualizada.' },
  notificationsTitle: { en: 'Notifications', pt: 'Notificações', es: 'Notificaciones' },
  notificationsDesc: { en: 'Manage your email notification preferences.', pt: 'Gerencie suas preferências de notificação por email.', es: 'Gestiona tus preferencias de notificación por correo electrónico.' },
  notificationsSoon: { en: 'Notification settings (e.g., email for overdue invoices, payment confirmations) will be configurable here.', pt: 'Configurações de notificação (ex: email para faturas vencidas, confirmações de pagamento) serão configuráveis aqui.', es: 'La configuración de notificaciones (p. ej., correo para facturas vencidas, confirmaciones de pago) se podrá configurar aquí.' },
  manageNotificationsButton: { en: 'Manage Notifications (Coming Soon)', pt: 'Gerenciar Notificações (Em Breve)', es: 'Gestionar Notificaciones (Próximamente)' },
  defaultNotesPlaceholder: { en: "Thank you for your business!", pt: "Obrigado pelo seu negócio!", es: "¡Gracias por su negocio!" },
  taxIdPlaceholder: { en: "Your Tax ID", pt: "Seu CPF/CNPJ ou Ident. Fiscal", es: "Su ID de Impuestos" },
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { 
    companyName: currentCompanyName, 
    email: currentEmail, 
    avatarPreview: currentAvatarPreview, 
    updateProfile 
  } = useProfile();
  const { language } = useLanguage();

  const [companyNameInput, setCompanyNameInput] = React.useState<string>(currentCompanyName);
  const [emailInput, setEmailInput] = React.useState<string>(currentEmail);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [localAvatarPreview, setLocalAvatarPreview] = React.useState<string | null>(currentAvatarPreview);
  
  const [defaultNotes, setDefaultNotes] = React.useState<string>(translations.defaultNotesPlaceholder[language]);
  const [taxId, setTaxId] = React.useState<string>(translations.taxIdPlaceholder[language]);

  const t = (key: keyof typeof translations) => translations[key][language] || translations[key]['en'];

  React.useEffect(() => {
    setCompanyNameInput(currentCompanyName);
  }, [currentCompanyName]);

  React.useEffect(() => {
    setEmailInput(currentEmail);
  }, [currentEmail]);
  
  React.useEffect(() => {
    setLocalAvatarPreview(currentAvatarPreview);
  }, [currentAvatarPreview]);

  React.useEffect(() => {
    setDefaultNotes(translations.defaultNotesPlaceholder[language]);
    setTaxId(translations.taxIdPlaceholder[language]);
  }, [language]);


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null);
      setLocalAvatarPreview(currentAvatarPreview); 
    }
  };

  const handleSaveProfile = () => {
    updateProfile({ 
      companyName: companyNameInput, 
      email: emailInput,
      avatarPreview: localAvatarPreview 
    });

    if (avatarFile) {
      console.log('Avatar to upload (simulation):', avatarFile.name);
    }
    toast({
      title: t('profileSavedToast'),
      description: t('profileUpdatedToastDesc'),
    });
  };

  const handleSaveInvoiceSettings = () => {
    console.log('Saving invoice settings with data:');
    console.log('Default Notes:', defaultNotes);
    console.log('Tax ID:', taxId);
    toast({
        title: t('invoiceSettingsSavedToast'),
        description: t('invoiceSettingsUpdatedToastDesc'),
    });
  };


  return (
    <>
      <PageTitle title="Settings" />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>{t('profileTitle')}</CardTitle>
                    <CardDescription>{t('profileDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="avatar-upload-input">{t('companyLogoLabel')}</Label>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={localAvatarPreview || "https://placehold.co/200x200.png"} alt="Company Logo" data-ai-hint="logo company"/>
                                <AvatarFallback>{companyNameInput?.substring(0,2).toUpperCase() || 'CL'}</AvatarFallback>
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
                                        <UploadCloud className="mr-2 h-4 w-4" /> {t('uploadButton')}
                                    </div>
                                </Button>
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name">{t('nameLabel')}</Label>
                        <Input id="name" value={companyNameInput} onChange={(e) => setCompanyNameInput(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">{t('emailLabel')}</Label>
                        <Input id="email" type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>
                    <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" /> {t('saveProfileButton')}
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t('invoiceCustomizationTitle')}</CardTitle>
                    <CardDescription>{t('invoiceCustomizationDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="defaultNotes">{t('defaultNotesLabel')}</Label>
                        <Input id="defaultNotes" value={defaultNotes} onChange={(e) => setDefaultNotes(e.target.value)} placeholder={t('defaultNotesPlaceholder')} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="taxId">{t('taxIdLabel')}</Label>
                        <Input id="taxId" value={taxId} onChange={(e) => setTaxId(e.target.value)} placeholder={t('taxIdPlaceholder')} />
                    </div>
                    <Button onClick={handleSaveInvoiceSettings}>
                         <Save className="mr-2 h-4 w-4" /> {t('saveInvoiceSettingsButton')}
                    </Button>
                </CardContent>
            </Card>

            <Separator className="my-6" />

            <Card>
                <CardHeader>
                    <CardTitle>{t('notificationsTitle')}</CardTitle>
                    <CardDescription>{t('notificationsDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm text-muted-foreground">{t('notificationsSoon')}</p>
                   <Button variant="outline" disabled>{t('manageNotificationsButton')}</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
