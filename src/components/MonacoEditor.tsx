import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function MonacoEditor({ value, onChange, onValidationChange }: MonacoEditorProps) {
  const { t } = useTranslation();
  const editorRef = useRef<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      bracketPairColorization: {
        enabled: true
      },
      guides: {
        bracketPairs: true,
        indentation: true
      }
    });

    // Set up validation
    const model = editor.getModel();
    if (model) {
      // Initial validation
      validateJson(model.getValue());
      
      // Listen for content changes
      model.onDidChangeContent(() => {
        const content = model.getValue();
        validateJson(content);
        onChange(content);
      });
    }
  };

  const validateJson = (content: string) => {
    if (!content.trim()) {
      onValidationChange(true);
      return;
    }

    try {
      JSON.parse(content);
      onValidationChange(true);
    } catch {
      onValidationChange(false);
    }
  };

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className="h-full w-full bg-editor-background border border-editor-border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language="json"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={isDarkMode ? 'vs-dark' : 'light'}
        options={{
          automaticLayout: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: true },
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          fontSize: 14,
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          renderWhitespace: 'selection',
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          formatOnPaste: true,
          formatOnType: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true
          },
          suggest: {
            insertMode: 'replace',
            showKeywords: false
          },
          hover: {
            enabled: true
          }
        }}
        loading={
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              <span>{t('status.loading')}...</span>
            </div>
          </div>
        }
      />
      
      {/* Placeholder when no content */}
      {!value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-muted-foreground">
            <div className="text-lg mb-2">📁</div>
            <p>{t('editor.placeholder')}</p>
          </div>
        </div>
      )}
    </div>
  );
}