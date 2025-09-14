import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonacoEditor } from './MonacoEditor';
import { UploadZone } from './UploadZone';
import { HelpGuide } from './HelpGuide';

interface EditorTabsProps {
  saveData: any;
  jsonContent: string;
  onJsonChange: (content: string) => void;
  onValidationChange: (valid: boolean) => void;
  onFileUpload: (file: File) => void;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export function EditorTabs({
  saveData,
  jsonContent,
  onJsonChange,
  onValidationChange,
  onFileUpload,
  status
}: EditorTabsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            {t('tabs.jsonEditor')}
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            {t('tabs.userGuide')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="flex-1 m-0 mt-4">
          {saveData ? (
            <MonacoEditor
              value={jsonContent}
              onChange={onJsonChange}
              onValidationChange={onValidationChange}
            />
          ) : (
            <div className="h-full p-4">
              <UploadZone 
                onFileUpload={onFileUpload}
                status={status}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="help" className="flex-1 m-0 mt-4">
          <HelpGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}