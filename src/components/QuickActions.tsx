import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, AlertCircle, Zap, Package, Gem, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuickActionsProps {
  saveData: any;
  onUpdateField: (path: string, value: any) => void;
}

// Define item configuration
const ITEMS_CONFIG = [
  {
    key: 'memoryLocket',
    name: 'Crest Socket Unlocker',
    icon: Package,
    nameKey: 'memoryLocket',
    descKey: 'memoryLocketDesc'
  },
  {
    key: 'largeRosary',
    name: 'Rosary_Set_Large',
    icon: Coins,
    nameKey: 'largeRosary',
    descKey: 'largeRosaryDesc'
  },
  {
    key: 'greatShard',
    name: 'Great Shard',
    icon: Gem,
    nameKey: 'greatShard',
    descKey: 'greatShardDesc'
  },
  {
    key: 'toolMetal',
    name: 'Tool Metal',
    icon: Wrench,
    nameKey: 'toolMetal',
    descKey: 'toolMetalDesc'
  }
];

export function QuickActions({ saveData, onUpdateField }: QuickActionsProps) {
  const { t } = useTranslation();
  const [rosaryBeads, setRosaryBeads] = useState<string>('');
  const [itemValues, setItemValues] = useState<Record<string, string>>({});

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
  
  // Check if we have any save data at all
  const hasAnyData = !!saveData;

  // Get item data
  const getItemData = (itemConfig: typeof ITEMS_CONFIG[0]) => {
    const item = findCollectable(itemConfig.name);
    const hasItem = item?.Data?.Amount !== undefined;
    const currentAmount = hasItem ? item.Data.Amount : 0;
    return { hasItem, currentAmount, item };
  };

  // Update local state when save data changes
  useEffect(() => {
    setRosaryBeads(hasRosaryField ? currentRosaryValue.toString() : '');
    
    const newItemValues: Record<string, string> = {};
    ITEMS_CONFIG.forEach(config => {
      const { hasItem, currentAmount } = getItemData(config);
      newItemValues[config.key] = hasItem ? currentAmount.toString() : '';
    });
    setItemValues(newItemValues);
  }, [saveData]);

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
    if (hasInfiniteJump && hasAnyData) {
      onUpdateField('playerData.infiniteAirJump', checked);
    }
  };

  // Helper to update collectable amount
  const updateCollectableAmount = (itemName: string, amount: number) => {
    if (!saveData?.playerData?.Collectables?.savedData || !hasAnyData) return;
    
    const itemIndex = saveData.playerData.Collectables.savedData.findIndex((item: any) => item.Name === itemName);
    if (itemIndex !== -1) {
      onUpdateField(`playerData.Collectables.savedData.${itemIndex}.Data.Amount`, amount);
    }
  };

  // Handle item value change
  const handleItemValueChange = (itemConfig: typeof ITEMS_CONFIG[0], value: string) => {
    const { hasItem } = getItemData(itemConfig);
    
    if (value === '' || /^\d+$/.test(value)) {
      setItemValues(prev => ({ ...prev, [itemConfig.key]: value }));
      
      if (value !== '' && hasItem && hasAnyData) {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
          updateCollectableAmount(itemConfig.name, numericValue);
        }
      }
    }
  };

  return (
    <div className="pb-4 border-b border-border">
      <h3 className="text-sm font-medium flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-primary" />
          {t('sidebar.quickActions')}
        </div>
        {!hasAnyData && (
          <Badge variant="outline" className="text-xs">
            {t('quickActions.uploadFileFirst')}
          </Badge>
        )}
      </h3>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">{t('quickActions.tabs.general')}</TabsTrigger>
          <TabsTrigger value="items">{t('quickActions.tabs.items')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
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
                disabled={!hasInfiniteJump || !hasAnyData}
              />
              <span className="text-xs text-muted-foreground">
                {currentInfiniteJump ? t('quickActions.enabled') : t('quickActions.disabled')}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {t('quickActions.infiniteJumpDesc')}
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
              onChange={(e) => handleNumberChange(e.target.value, setRosaryBeads, 'playerData.geo', hasRosaryField && hasAnyData)}
              placeholder={t('quickActions.enterAmount')}
              disabled={!hasRosaryField || !hasAnyData}
              className="h-8 text-sm"
            />
            
            <p className="text-xs text-muted-foreground">
              {t('quickActions.rosaryBeadsDesc')}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          {ITEMS_CONFIG.map((itemConfig) => {
            const { hasItem } = getItemData(itemConfig);
            const IconComponent = itemConfig.icon;
            
            return (
              <div key={itemConfig.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={itemConfig.key} className="text-xs font-medium flex items-center gap-2">
                    <IconComponent className="h-3 w-3 text-primary" />
                    {t(`quickActions.${itemConfig.nameKey}`)}
                  </Label>
                  {hasItem ? (
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
                  id={itemConfig.key}
                  type="number"
                  min="0"
                  value={itemValues[itemConfig.key] || ''}
                  onChange={(e) => handleItemValueChange(itemConfig, e.target.value)}
                  placeholder={t('quickActions.enterAmount')}
                  disabled={!hasItem || !hasAnyData}
                  className="h-8 text-sm"
                />
                
                <p className="text-xs text-muted-foreground">
                  {t(`quickActions.${itemConfig.descKey}`)}
                </p>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
