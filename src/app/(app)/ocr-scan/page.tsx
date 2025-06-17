
'use client';

import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Download, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { extractInvoiceData, type ExtractInvoiceDataInput } from '@/ai/flows/extract-invoice-data-flow';

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
    if (!selectedFile) {
        toast({
            variant: 'destructive',
            title: 'Nenhum arquivo selecionado',
            description: 'Por favor, selecione uma imagem primeiro.',
        });
        return;
    }

    setIsLoading(true);
    setExtractedText(null); 

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imageDataUri = reader.result as string;
        const input: ExtractInvoiceDataInput = { imageDataUri };
        const result = await extractInvoiceData(input);
        
        if (result && result.extractedText) {
            setExtractedText(result.extractedText);
            toast({
                title: 'Texto Extraído!',
                description: 'Os dados da imagem foram processados pela IA.',
            });
        } else {
            setExtractedText("Nenhum texto foi extraído pela IA ou ocorreu um erro na formatação da resposta.");
            toast({
                variant: 'destructive',
                title: 'Extração Falhou',
                description: 'A IA não retornou texto ou houve um problema.',
            });
        }
      } catch (error) {
        console.error('Error extracting text with AI:', error);
        setExtractedText(`Erro ao extrair texto: ${error instanceof Error ? error.message : String(error)}`);
        toast({
          variant: 'destructive',
          title: 'Erro na Extração',
          description: 'Ocorreu um erro ao tentar extrair dados da imagem. Verifique o console para detalhes.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast({ 
          variant: 'destructive',
          title: 'Erro ao ler arquivo',
          description: 'Não foi possível ler o arquivo selecionado.'
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleExportToExcel = () => {
    if (!extractedText) {
        toast({
            variant: 'destructive',
            title: 'Nenhum dado para exportar',
            description: 'Não há texto extraído para ser exportado.',
        });
        return;
    }

    // Attempt to create a simple CSV from the extracted text
    // This part might need refinement based on actual AI output format
    const lines = extractedText.split('\n').filter(line => line.trim() !== '');
    let csvContent = "Extracted_Data\n"; // Header for a single column CSV

    if (lines.some(line => line.includes(':'))) {
        // If it looks like key-value pairs, try to make it two columns
        csvContent = "Campo,Valor\n";
        lines.forEach(line => {
            const parts = line.split(':');
            const field = parts[0]?.trim() || "N/A";
            const value = parts.slice(1).join(':')?.trim() || "N/A";
            const escapedField = `"${field.replace(/"/g, '""')}"`;
            const escapedValue = `"${value.replace(/"/g, '""')}"`;
            csvContent += `${escapedField},${escapedValue}\n`;
        });
    } else {
        // Otherwise, treat each line as a separate row in a single column
        lines.forEach(line => {
            const escapedLine = `"${line.replace(/"/g, '""')}"`;
            csvContent += `${escapedLine}\n`;
        });
    }


    if (csvContent === "Campo,Valor\n" || csvContent === "Extracted_Data\n") {
      toast({
        variant: 'destructive',
        title: 'Nenhum dado para exportar',
        description: 'Não foi possível parsear os dados extraídos para o formato CSV.',
      });
      return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
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
                {isLoading ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Extraindo...
                  </>
                ) : (
                  'Extrair Dados da Imagem'
                )}
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
