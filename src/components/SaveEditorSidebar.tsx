import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  Download, 
  Trash2, 
  HelpCircle, 
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LanguageSelector } from './LanguageSelector';
import { QuickActions } from './QuickActions';

interface SaveEditorSidebarProps {
  onUpload: (file: File) => void;
  onDownload: () => void;
  onClear: () => void;
  hasData: boolean;
  isValidJson: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  saveData: any;
  onUpdateField: (path: string, value: any) => void;
}

export function SaveEditorSidebar({
  onUpload,
  onDownload,
  onClear,
  hasData,
  isValidJson,
  status,
  saveData,
  onUpdateField
}: SaveEditorSidebarProps) {
  const { t } = useTranslation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'loading':
        return t('status.loading');
      case 'success':
        return t('status.success');
      case 'error':
        return t('status.error');
      default:
        return t('status.ready');
    }
  };

  return (
    <div className="w-full h-full bg-gradient-bg border-r border-sidebar-border p-4 space-y-6">
      {/* Header with Language Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <LanguageSelector />
        </div>
        <p className="text-sm text-muted-foreground">
          {t('app.subtitle')}
        </p>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <Badge variant={status === 'error' ? 'destructive' : status === 'success' ? 'default' : 'secondary'}>
            {getStatusText()}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* File Operations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            {t('sidebar.fileOperations')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Upload Button */}
          <div>
            <input
              type="file"
              accept=".dat"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={status === 'loading'}
            />
            <Button
              asChild
              variant="glow"
              size="sm"
              className="w-full"
              disabled={status === 'loading'}
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4" />
                {t('sidebar.upload')}
              </label>
            </Button>
          </div>

          {/* Download Button */}
          <Button
            onClick={onDownload}
            variant="success"
            size="sm"
            className="w-full"
            disabled={!hasData || !isValidJson || status === 'loading'}
          >
            <Download className="h-4 w-4" />
            {t('sidebar.download')}
          </Button>

          {/* Clear Button */}
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!hasData || status === 'loading'}
          >
            <Trash2 className="h-4 w-4" />
            {t('sidebar.clear')}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {hasData && (
        <QuickActions 
          saveData={saveData}
          onUpdateField={onUpdateField}
        />
      )}

      {/* Help Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            {t('sidebar.help')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Save Locations */}
          <Collapsible open={isLocationsOpen} onOpenChange={setIsLocationsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                {t('sidebar.saveLocations')}
                <span className={`transform transition-transform ${isLocationsOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="text-xs space-y-3 p-3 bg-muted/50 rounded-md">
                <div>
                  <strong className="text-foreground">{t('help.locations.macos')}:</strong>
                  <code className="block mt-1 text-[10px] bg-background p-1 rounded">
                    ~/Library/Application Support/unity.Team-Cherry.Silksong/{'{SteamID}'}/user1.dat
                  </code>
                </div>
                <div>
                  <strong className="text-foreground">{t('help.locations.windows')}:</strong>
                  <code className="block mt-1 text-[10px] bg-background p-1 rounded">
                    %USERPROFILE%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/{'{SteamID}'}/user1.dat
                  </code>
                </div>
                <div>
                  <strong className="text-foreground">{t('help.locations.linux')}:</strong>
                  <code className="block mt-1 text-[10px] bg-background p-1 rounded">
                    ~/.config/unity3d/Team Cherry/Hollow Knight Silksong/{'{SteamID}'}/user1.dat
                  </code>
                </div>
                <p className="text-warning text-[10px] italic">
                  {t('help.locations.note')}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Usage Guide */}
          <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                {t('help.usage.title')}
                <span className={`transform transition-transform ${isHelpOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="text-xs space-y-2 p-3 bg-muted/50 rounded-md">
                <p>{t('help.usage.step1')}</p>
                <p>{t('help.usage.step2')}</p>
                <p>{t('help.usage.step3')}</p>
                <p>{t('help.usage.step4')}</p>
                <p>{t('help.usage.step5')}</p>
                
                <div className="mt-3 pt-2 border-t border-border">
                  <p className="font-medium text-warning text-[10px] mb-1">{t('help.tips.title')}</p>
                  <p className="text-[10px]">• {t('help.tips.backup')}</p>
                  <p className="text-[10px]">• {t('help.tips.test')}</p>
                  <p className="text-[10px] text-success">• {t('help.tips.verified')}</p>
                  <p className="text-[10px]">• {t('help.tips.syntax')}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* JSON Validation Status */}
      {hasData && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm">
              {isValidJson ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-success">{t('editor.valid')}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">{t('editor.invalid')}</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}