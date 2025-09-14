import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, AlertCircle, Zap, Package, Gem } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface QuickActionsProps {
  saveData: any;
  onUpdateField: (path: string, value: any) => void;
}

export function QuickActions({ saveData, onUpdateField }: QuickActionsProps) {
  const { t } = useTranslation();
  const [rosaryBeads, setRosaryBeads] = useState<string>('');
  const [memoryLocket, setMemoryLocket] = useState<string>('');
  const [largeRosary, setLargeRosary] = useState<string>('');
  const [greatShard, setGreatShard] = useState<string>('');

  // Helper function to find item in collectables by name
  const findCollectable = (name: string) => {
    if (!saveData?.playerData?.Collectables?.savedData) return null;
    return saveData.playerData.Collectables.savedData.find((item: any) => item.Name === name);
  };

  // Check field availability and get current values
  const hasRosaryField = saveData?.playerData?.geo !== undefined;
  const currentRosaryValue = hasRosaryField ? saveData.playerData.geo : 0;
  
  const hasInfiniteJump = saveData?.playerData?.infiniteAirJump !== undefined;
  const currentInfiniteJump = hasInfiniteJump ? saveData.playerData.infiniteAirJump : false;
  
  const memoryLocketItem = findCollectable('Crest Socket Unlocker');
  const hasMemoryLocket = memoryLocketItem?.Data?.Amount !== undefined;
  const currentMemoryLocket = hasMemoryLocket ? memoryLocketItem.Data.Amount : 0;
  
  const largeRosaryItem = findCollectable('Rosary_Set_Large');
  const hasLargeRosary = largeRosaryItem?.Data?.Amount !== undefined;
  const currentLargeRosary = hasLargeRosary ? largeRosaryItem.Data.Amount : 0;
  
  const greatShardItem = findCollectable('Great Shard');
  const hasGreatShard = greatShardItem?.Data?.Amount !== undefined;
  const currentGreatShard = hasGreatShard ? greatShardItem.Data.Amount : 0;

  // Update local state when save data changes
  useEffect(() => {
    setRosaryBeads(hasRosaryField ? currentRosaryValue.toString() : '');
    setMemoryLocket(hasMemoryLocket ? currentMemoryLocket.toString() : '');
    setLargeRosary(hasLargeRosary ? currentLargeRosary.toString() : '');
    setGreatShard(hasGreatShard ? currentGreatShard.toString() : '');
  }, [hasRosaryField, currentRosaryValue, hasMemoryLocket, currentMemoryLocket, hasLargeRosary, currentLargeRosary, hasGreatShard, currentGreatShard]);

  // Generic number input handler
  const handleNumberChange = (value: string, setter: (val: string) => void, fieldPath: string, isAvailable: boolean) => {
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
      if (value !== '' && isAvailable) {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
          onUpdateField(fieldPath, numericValue);
        }
      }
    }
  };

  // Handle infinite jump toggle
  const handleInfiniteJumpChange = (checked: boolean) => {
    if (hasInfiniteJump) {
      onUpdateField('playerData.infiniteAirJump', checked);
    }
  };

  // Helper to update collectable amount
  const updateCollectableAmount = (itemName: string, amount: number) => {
    if (!saveData?.playerData?.Collectables?.savedData) return;
    
    const itemIndex = saveData.playerData.Collectables.savedData.findIndex((item: any) => item.Name === itemName);
    if (itemIndex !== -1) {
      onUpdateField(`playerData.Collectables.savedData.${itemIndex}.Data.Amount`, amount);
    }
  };

  return (
    <div className="pb-4 border-b border-border">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
        <Coins className="h-4 w-4 text-primary" />
        {t('sidebar.quickActions')}
      </h3>
      <div className="space-y-4">
        {/* Infinite Air Jump Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="infinite-jump" className="text-xs font-medium flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary" />
              {t('quickActions.infiniteJump')}
            </Label>
            {hasInfiniteJump ? (
              <Badge variant="secondary" className="text-xs">
                ✓
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3" />
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              id="infinite-jump"
              checked={currentInfiniteJump}
              onCheckedChange={handleInfiniteJumpChange}
              disabled={!hasInfiniteJump}
            />
            <span className="text-xs text-muted-foreground">
              {currentInfiniteJump ? t('quickActions.enabled') : t('quickActions.disabled')}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {hasInfiniteJump 
              ? t('quickActions.infiniteJumpDesc')
              : t('quickActions.fieldUnavailable')
            }
          </p>
        </div>

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
            onChange={(e) => handleNumberChange(e.target.value, setRosaryBeads, 'playerData.geo', hasRosaryField)}
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

        {/* Memory Locket (Crest Socket Unlocker) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="memory-locket" className="text-xs font-medium flex items-center gap-2">
              <Package className="h-3 w-3 text-primary" />
              {t('quickActions.memoryLocket')}
            </Label>
            {hasMemoryLocket ? (
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
            id="memory-locket"
            type="number"
            min="0"
            value={memoryLocket}
            onChange={(e) => {
              const value = e.target.value;
              handleNumberChange(value, setMemoryLocket, '', hasMemoryLocket);
              if (value !== '' && hasMemoryLocket) {
                const numericValue = parseInt(value, 10);
                if (!isNaN(numericValue) && numericValue >= 0) {
                  updateCollectableAmount('Crest Socket Unlocker', numericValue);
                }
              }
            }}
            placeholder={t('quickActions.enterAmount')}
            disabled={!hasMemoryLocket}
            className="h-8 text-sm"
          />
          
          <p className="text-xs text-muted-foreground">
            {hasMemoryLocket 
              ? t('quickActions.memoryLocketDesc')
              : t('quickActions.fieldUnavailable')
            }
          </p>
        </div>

        {/* Large Rosary Set */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="large-rosary" className="text-xs font-medium flex items-center gap-2">
              <Coins className="h-3 w-3 text-primary" />
              {t('quickActions.largeRosary')}
            </Label>
            {hasLargeRosary ? (
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
            id="large-rosary"
            type="number"
            min="0"
            value={largeRosary}
            onChange={(e) => {
              const value = e.target.value;
              handleNumberChange(value, setLargeRosary, '', hasLargeRosary);
              if (value !== '' && hasLargeRosary) {
                const numericValue = parseInt(value, 10);
                if (!isNaN(numericValue) && numericValue >= 0) {
                  updateCollectableAmount('Rosary_Set_Large', numericValue);
                }
              }
            }}
            placeholder={t('quickActions.enterAmount')}
            disabled={!hasLargeRosary}
            className="h-8 text-sm"
          />
          
          <p className="text-xs text-muted-foreground">
            {hasLargeRosary 
              ? t('quickActions.largeRosaryDesc')
              : t('quickActions.fieldUnavailable')
            }
          </p>
        </div>

        {/* Great Shard */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="great-shard" className="text-xs font-medium flex items-center gap-2">
              <Gem className="h-3 w-3 text-primary" />
              {t('quickActions.greatShard')}
            </Label>
            {hasGreatShard ? (
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
            id="great-shard"
            type="number"
            min="0"
            value={greatShard}
            onChange={(e) => {
              const value = e.target.value;
              handleNumberChange(value, setGreatShard, '', hasGreatShard);
              if (value !== '' && hasGreatShard) {
                const numericValue = parseInt(value, 10);
                if (!isNaN(numericValue) && numericValue >= 0) {
                  updateCollectableAmount('Great Shard', numericValue);
                }
              }
            }}
            placeholder={t('quickActions.enterAmount')}
            disabled={!hasGreatShard}
            className="h-8 text-sm"
          />
          
          <p className="text-xs text-muted-foreground">
            {hasGreatShard 
              ? t('quickActions.greatShardDesc')
              : t('quickActions.fieldUnavailable')
            }
          </p>
        </div>
      </div>
    </div>
  );
}
