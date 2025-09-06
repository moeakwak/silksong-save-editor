import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveEditorSidebar } from './SaveEditorSidebar';
import { MonacoEditor } from './MonacoEditor';
import { decodeSilksongSave, encodeSilksongSave, downloadFile } from '@/utils/saveDecoder';
import { useToast } from '@/hooks/use-toast';

export function SaveEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [saveData, setSaveData] = useState<any>(null);
  const [jsonContent, setJsonContent] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFileUpload = useCallback(async (file: File) => {
    setStatus('loading');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const decoded = decodeSilksongSave(arrayBuffer);
      
      setSaveData(decoded);
      setJsonContent(JSON.stringify(decoded, null, 2));
      setStatus('success');
      
      toast({
        title: t('status.success'),
        description: t('upload.success'),
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
      
      toast({
        title: t('status.error'),
        description: t('upload.error'),
        variant: 'destructive'
      });
    }
  }, [t, toast]);

  const handleDownload = useCallback(() => {
    if (!jsonContent || !isValidJson) {
      toast({
        title: t('status.error'),
        description: t('download.error'),
        variant: 'destructive'
      });
      return;
    }

    setStatus('loading');

    try {
      const parsedData = JSON.parse(jsonContent);
      const encodedData = encodeSilksongSave(parsedData);
      
      downloadFile(encodedData, t('download.filename'));
      setStatus('success');
      
      toast({
        title: t('status.success'),
        description: t('download.success'),
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Download error:', error);
      setStatus('error');
      
      toast({
        title: t('status.error'),
        description: t('download.error'),
        variant: 'destructive'
      });
    }
  }, [jsonContent, isValidJson, t, toast]);

  const handleClear = useCallback(() => {
    setSaveData(null);
    setJsonContent('');
    setIsValidJson(true);
    setStatus('idle');
    
    toast({
      title: t('status.success'),
      description: 'Editor cleared',
      variant: 'default'
    });
  }, [toast, t]);

  const handleJsonChange = useCallback((newContent: string) => {
    setJsonContent(newContent);
  }, []);

  const handleValidationChange = useCallback((valid: boolean) => {
    setIsValidJson(valid);
  }, []);

  return (
    <div className="h-screen w-screen flex bg-background">
      {/* Sidebar - 1/4 width */}
      <div className="w-1/4 min-w-[320px] max-w-[400px]">
        <SaveEditorSidebar
          onUpload={handleFileUpload}
          onDownload={handleDownload}
          onClear={handleClear}
          hasData={!!saveData}
          isValidJson={isValidJson}
          status={status}
        />
      </div>

      {/* Monaco Editor - 3/4 width */}
      <div className="flex-1 p-4">
        <div className="h-full">
          <MonacoEditor
            value={jsonContent}
            onChange={handleJsonChange}
            onValidationChange={handleValidationChange}
          />
        </div>
      </div>
    </div>
  );
}