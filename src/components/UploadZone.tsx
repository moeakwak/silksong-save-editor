import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export function UploadZone({ onFileUpload, status }: UploadZoneProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file.name.endsWith('.dat')) {
      onFileUpload(file);
    } else {
      // 可以添加错误提示
      console.warn('Invalid file type. Please select a .dat file.');
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const datFile = files.find(file => file.name.endsWith('.dat'));
    
    if (datFile) {
      handleFileUpload(datFile);
    }
  }, [handleFileUpload]);

  const isLoading = status === 'loading';

  return (
    <div className="h-full w-full flex items-center justify-center p-8 bg-background/30 backdrop-blur-sm">
      <Card 
        className={`
          w-full max-w-2xl h-96 border-2 border-dashed transition-all duration-300 cursor-pointer backdrop-blur-sm
          ${isDragging 
            ? 'border-primary bg-primary/10 scale-105 glow-primary' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30 glow-border'
          }
          ${isLoading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label 
          htmlFor="upload-zone-input" 
          className="h-full w-full flex flex-col items-center justify-center gap-6 cursor-pointer p-8"
        >
          {/* Icon */}
          <div className={`
            p-6 rounded-full transition-all duration-300
            ${isDragging 
              ? 'bg-primary text-primary-foreground scale-110 glow-primary' 
              : 'bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary'
            }
          `}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
            ) : isDragging ? (
              <FileText className="h-12 w-12" />
            ) : (
              <Upload className="h-12 w-12" />
            )}
          </div>

          {/* Main Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground silksong-title">
              {isLoading ? t('upload.loading') : t('upload.title')}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {isDragging 
                ? t('upload.dropHere') 
                : isLoading 
                  ? t('upload.processing')
                  : t('upload.description')
              }
            </p>
          </div>

          {/* Action Button */}
          {!isLoading && !isDragging && (
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 hover:bg-primary hover:text-primary-foreground glow-border"
              asChild
            >
              <span>
                <Upload className="h-5 w-5" />
                {t('upload.button')}
              </span>
            </Button>
          )}

          {/* File Format Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('upload.formatNote')}
            </p>
          </div>
        </label>

        {/* Hidden File Input */}
        <input
          id="upload-zone-input"
          type="file"
          accept=".dat"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
      </Card>
    </div>
  );
}