
'use client';

import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Download } from 'lucide-react';
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
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(selectedFile);
    // fileReader.onload = async () => {
    //   const photoDataUri = fileReader.result as string;
    //   // const result = await yourGenkitOcrFlow({ photoDataUri });
    //   // setExtractedText(result.extractedData); // Assuming result has this structure
    //   setIsLoading(false);
    //   toast({ title: 'Texto Extraído!', description: 'Os dados da imagem foram processados.' });
    // };
    // fileReader.onerror = () => {
    //   setIsLoading(false);
    //   toast({ variant: 'destructive', title: 'Erro ao ler arquivo.' });
    // };
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setExtractedText(`Dados extraídos (simulado):\nValor: R$ 123,45\nData: 20/10/2023\nEmpresa: Exemplo LTDA\nCNPJ: 00.000.000/0001-00`);
    setIsLoading(false);
    toast({
        title: 'Texto Extraído!',
        description: 'Os dados da imagem foram processados (simulação).',
    });
  };

  const handleExportToExcel = () => {
    if (!extractedText) return;

    const lines = extractedText.split('\n');
    const dataRows: string[] = [];
    
    // Skip the first line if it's the header "Dados extraídos (simulado):"
    const startIndex = lines[0].toLowerCase().includes("dados extraídos") ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const field = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            // Escape double quotes in value by replacing with two double quotes
            const escapedValue = value.replace(/"/g, '""');
            dataRows.push(`"${field}","${escapedValue}"`);
        }
    }

    if (dataRows.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Nenhum dado para exportar',
        description: 'Não foi possível parsear os dados extraídos para o formato CSV.',
      });
      return;
    }

    const csvHeader = "Campo,Valor\n";
    const csvContent = csvHeader + dataRows.join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) { // Check if HTML5 download attribute is supported
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "dados_extraidos.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast({
            title: 'Exportação Concluída',
            description: 'O arquivo dados_extraidos.csv foi baixado.',
        });
    } else {
         toast({
            variant: 'destructive',
            title: 'Exportação não suportada',
            description: 'Seu navegador não suporta o download direto de arquivos.',
        });
    }
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
              <Button onClick={handleExportToExcel} variant="outline" disabled={isLoading}>
                <Download className="mr-2 h-4 w-4" /> Exportar para CSV
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

