import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveEditorSidebar } from './SaveEditorSidebar';
import { MonacoEditor } from './MonacoEditor';
import { UploadZone } from './UploadZone';
import { decodeSilksongSave, encodeSilksongSave, downloadFile } from '@/utils/saveDecoder';
import { useToast } from '@/hooks/use-toast';

export function SaveEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [saveData, setSaveData] = useState<any>(null);
  const [jsonContent, setJsonContent] = useState<string>('');
  const [originalJsonContent, setOriginalJsonContent] = useState<string>(''); // Store original content
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFileUpload = useCallback(async (file: File) => {
    setStatus('loading');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const decoded = decodeSilksongSave(arrayBuffer);
      const jsonString = JSON.stringify(decoded, null, 2);
      
      setSaveData(decoded);
      setJsonContent(jsonString);
      setOriginalJsonContent(jsonString); // Store original content
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
    setOriginalJsonContent(''); // Clear original content
    setIsValidJson(true);
    setStatus('idle');
    
    toast({
      title: t('status.success'),
      description: t('sidebar.clearSuccess'),
      variant: 'default'
    });
  }, [toast, t]);

  const handleReset = useCallback(() => {
    if (originalJsonContent) {
      try {
        const originalData = JSON.parse(originalJsonContent);
        setSaveData(originalData);
        setJsonContent(originalJsonContent);
        setIsValidJson(true);
        
        toast({
          title: t('status.success'),
          description: t('sidebar.resetSuccess'),
          variant: 'default'
        });
      } catch (error) {
        console.error('Reset error:', error);
        toast({
          title: t('status.error'),
          description: t('sidebar.resetError'),
          variant: 'destructive'
        });
      }
    }
  }, [originalJsonContent, t, toast]);

  const handleJsonChange = useCallback((newContent: string) => {
    setJsonContent(newContent);
  }, []);

  const handleValidationChange = useCallback((valid: boolean) => {
    setIsValidJson(valid);
  }, []);

  const handleFieldUpdate = useCallback((path: string, value: any) => {
    try {
      // Parse current JSON content
      const currentData = JSON.parse(jsonContent);
      
      // Update the field using path (e.g., "playerData.geo")
      const pathParts = path.split('.');
      let target = currentData;
      
      // Navigate to the parent object
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (target[pathParts[i]] === undefined) {
          target[pathParts[i]] = {};
        }
        target = target[pathParts[i]];
      }
      
      // Set the final value
      target[pathParts[pathParts.length - 1]] = value;
      
      // Update the JSON content
      const updatedJson = JSON.stringify(currentData, null, 2);
      setJsonContent(updatedJson);
      setSaveData(currentData);
      
    } catch (error) {
      console.error('Error updating field:', error);
    }
  }, [jsonContent]);

  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      {/* Sidebar - 1/4 width */}
      <div className="w-1/4 min-w-[320px] max-w-[400px] h-full border-r border-border overflow-hidden">
        <SaveEditorSidebar
          onUpload={handleFileUpload}
          onDownload={handleDownload}
          onClear={handleClear}
          onReset={handleReset}
          hasData={!!saveData}
          hasChanges={jsonContent !== originalJsonContent && !!originalJsonContent}
          isValidJson={isValidJson}
          status={status}
          saveData={saveData}
          onUpdateField={handleFieldUpdate}
        />
      </div>

      {/* Right Panel - 3/4 width */}
      <div className="flex-1 h-full overflow-hidden">
        {saveData ? (
          <MonacoEditor
            value={jsonContent}
            onChange={handleJsonChange}
            onValidationChange={handleValidationChange}
          />
        ) : (
          <UploadZone 
            onFileUpload={handleFileUpload}
            status={status}
          />
        )}
      </div>
    </div>
  );
}