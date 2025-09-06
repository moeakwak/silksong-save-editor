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
  Info,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  onReset: () => void;
  hasData: boolean;
  hasChanges: boolean;
  isValidJson: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  saveData: any;
  onUpdateField: (path: string, value: any) => void;
}

export function SaveEditorSidebar({
  onUpload,
  onDownload,
  onClear,
  onReset,
  hasData,
  hasChanges,
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
    <div className="w-full h-full flex flex-col bg-sidebar border-r border-sidebar-border overflow-hidden backdrop-blur-sm glow-border">
      {/* Header with Logo */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0 backdrop-blur-md">
        <div className="space-y-3">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/silksong-save-editor-logo.png" 
              alt="Silksong Save Editor" 
              className="h-28 w-auto object-contain drop-shadow-lg"
            />
          </div>
          
          {/* Controls Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => window.open('https://github.com/moeakwak/silksong-save-editor', '_blank')}
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <Badge variant={status === 'error' ? 'destructive' : status === 'success' ? 'default' : 'secondary'}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 backdrop-blur-md">
        {/* File Operations */}
        <div className="pb-4 border-b border-border">
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <FolderOpen className="h-4 w-4" />
            {t('sidebar.fileOperations')}
          </h3>
          <div className="space-y-3">
            {/* Upload/Clear Toggle Button */}
            {!hasData ? (
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
            ) : (
              <Button
                onClick={onClear}
                variant="outline"
                size="sm"
                className="w-full"
                disabled={status === 'loading'}
              >
                <Trash2 className="h-4 w-4" />
                {t('sidebar.clear')}
              </Button>
            )}

            {/* Reset Button - Only show when data exists and has changes */}
            {hasData && hasChanges && (
              <Button
                onClick={onReset}
                variant="secondary"
                size="sm"
                className="w-full"
                disabled={status === 'loading'}
              >
                <AlertCircle className="h-4 w-4" />
                {t('sidebar.reset')}
              </Button>
            )}

            {/* Download Button - Only show when data exists */}
            {hasData && (
              <Button
                onClick={onDownload}
                variant="success"
                size="sm"
                className="w-full"
                disabled={!isValidJson || status === 'loading'}
              >
                <Download className="h-4 w-4" />
                {t('sidebar.download')}
              </Button>
            )}
          </div>
          
          {/* Backup Warning */}
          <div className="mt-4 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
            <p className="font-medium mb-1">⚠️ {t('sidebar.backupWarning.title')}</p>
            <p>{t('sidebar.backupWarning.message')}</p>
          </div>
        </div>

        {/* Quick Actions */}
        {hasData && (
          <QuickActions 
            saveData={saveData}
            onUpdateField={onUpdateField}
          />
        )}

        {/* Help Section */}
        <div className="pb-4 border-b border-border">
          <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
            <HelpCircle className="h-4 w-4" />
            {t('sidebar.help')}
          </h3>
          <div className="space-y-3">
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
          </div>
        </div>

        {/* JSON Validation Status */}
        {hasData && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
}