import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface QuickActionsProps {
  saveData: any;
  onUpdateField: (path: string, value: any) => void;
}

export function QuickActions({ saveData, onUpdateField }: QuickActionsProps) {
  const { t } = useTranslation();
  const [rosaryBeads, setRosaryBeads] = useState<string>('');

  // Check if the rosary beads field exists
  const hasRosaryField = saveData?.playerData?.geo !== undefined;
  const currentRosaryValue = hasRosaryField ? saveData.playerData.geo : 0;

  // Update local state when save data changes
  useEffect(() => {
    if (hasRosaryField) {
      setRosaryBeads(currentRosaryValue.toString());
    } else {
      setRosaryBeads('');
    }
  }, [hasRosaryField, currentRosaryValue]);

  // Handle rosary beads input change
  const handleRosaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Allow empty string or valid numbers
    if (value === '' || /^\d+$/.test(value)) {
      setRosaryBeads(value);
      
      // Update the save data if it's a valid number
      if (value !== '' && hasRosaryField) {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
          onUpdateField('playerData.geo', numericValue);
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Coins className="h-4 w-4 text-primary" />
          {t('sidebar.quickActions')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rosary Beads Quick Edit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="rosary-beads" className="text-xs font-medium">
              {t('quickActions.rosaryBeads')}
            </Label>
            {hasRosaryField ? (
              <Badge variant="secondary" className="text-xs">
                ✓
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3" />
              </Badge>
            )}
          </div>
          
          <Input
            id="rosary-beads"
            type="number"
            min="0"
            value={rosaryBeads}
            onChange={handleRosaryChange}
            placeholder={t('quickActions.enterAmount')}
            disabled={!hasRosaryField}
            className="h-8 text-sm"
          />
          
          <p className="text-xs text-muted-foreground">
            {hasRosaryField 
              ? t('quickActions.rosaryBeadsDesc')
              : t('quickActions.fieldUnavailable')
            }
          </p>
        </div>

        {/* Future quick actions can be added here */}
        {/* Example structure for adding more quick actions:
        <div className="space-y-2">
          <Label htmlFor="another-field" className="text-xs font-medium">
            Another Quick Action
          </Label>
          <Input
            id="another-field"
            // ... other props
          />
        </div>
        */}
      </CardContent>
    </Card>
  );
}
