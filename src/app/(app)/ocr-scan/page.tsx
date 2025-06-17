
'use client';

import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Download } from 'lucide-react'; // Import Download icon
import Image from 'next/image';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

export default function OcrScanPage() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [extractedText, setExtractedText] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: 'destructive',
          title: 'Arquivo muito grande',
          description: 'Por favor, selecione um arquivo menor que 5MB.',
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setExtractedText(null); // Clear previous results
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleExtractText = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setExtractedText("Simulando extração de texto..."); // Placeholder for actual OCR call
    // In a real app, you would call your Genkit flow here:
    // const formData = new FormData();
    // formData.append('image', selectedFile);
    // const response = await fetch('/api/ocr', { method: 'POST', body: formData });
    // const data = await response.json();
    // setExtractedText(data.text);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setExtractedText(`Dados extraídos (simulado):\nValor: R$ 123,45\nData: 20/10/2023\nEmpresa: Exemplo LTDA\nCNPJ: 00.000.000/0001-00`);
    setIsLoading(false);
    toast({
        title: 'Texto Extraído!',
        description: 'Os dados da imagem foram processados (simulação).',
    });
  };

  const handleExportToExcel = () => {
    if (!extractedText) return;
    // In a real app, this would trigger a CSV/Excel download.
    console.log("Exporting to Excel (simulated):", extractedText);
    toast({
        title: 'Exportação Iniciada (Simulação)',
        description: 'Os dados extraídos seriam formatados e baixados como Excel.',
    });
  };

  return (
    <>
      <PageTitle title="Reconhecimento de Notas (OCR)" />
      <Card>
        <CardHeader>
          <CardTitle>Upload de Comprovante ou Nota Fiscal</CardTitle>
          <CardDescription>
            Faça o upload de uma imagem (JPG, PNG, GIF) do seu comprovante ou nota fiscal para extrair os dados automaticamente. Limite de 5MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            id="ocr-file-upload"
          />
          <Button onClick={handleUploadClick} variant="outline" className="w-full md:w-auto">
            <UploadCloud className="mr-2 h-4 w-4" /> Selecionar Imagem
          </Button>

          {previewUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pré-visualização:</h3>
              <div className="relative w-full max-w-md h-auto aspect-video rounded-md border overflow-hidden">
                <Image src={previewUrl} alt="Preview da nota fiscal" layout="fill" objectFit="contain" data-ai-hint="receipt invoice" />
              </div>
              <Button onClick={handleExtractText} disabled={isLoading || !selectedFile}>
                {isLoading ? 'Extraindo...' : 'Extrair Dados da Imagem'}
              </Button>
            </div>
          )}

          {extractedText && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Dados Extraídos:</h3>
              <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{extractedText}</pre>
              <Button onClick={handleExportToExcel} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Exportar para Excel (Simulado)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
