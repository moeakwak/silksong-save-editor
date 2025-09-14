import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const englishContent = `
# Silksong Save Editor - Complete Guide

## 🎮 What is This Tool?

The **Silksong Save Editor** is a professional web-based tool designed specifically for editing save files from *Hollow Knight: Silksong*. It provides a safe, user-friendly interface for modifying game data while maintaining file integrity.

## 🚀 Quick Start

### Step 1: Locate Your Save File

Your Silksong save files are stored in different locations depending on your operating system:

#### Windows
\`\`\`
%USERPROFILE%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/{SteamID}/user1.dat
\`\`\`

#### macOS
\`\`\`
~/Library/Application Support/unity.Team-Cherry.Silksong/{SteamID}/user1.dat
\`\`\`

#### Linux
\`\`\`
~/.config/unity3d/Team Cherry/Hollow Knight Silksong/{SteamID}/user1.dat
\`\`\`

> **Note:** Replace \`{SteamID}\` with your actual Steam ID number.

### Step 2: Upload Your Save File

1. Click the **"Upload Save File"** button in the sidebar
2. Select your \`.dat\` file from the file browser
3. Wait for the file to be processed and decoded
4. Your save data will appear in the JSON editor

### Step 3: Edit Your Data

You can modify your save data in two ways:

#### Quick Actions (Recommended for Beginners)
Use the **Quick Actions** panel in the sidebar to edit common values:
- **Infinite Air Jump**: Enable unlimited jumping
- **Rosary Beads**: Modify your currency (geo)
- **Memory Locket**: Crest Socket Unlocker items
- **Large Rosary Set**: Adds 220 rosary beads when used
- **Great Bone Shard Pack**: Adds 200 bone fragments when used

#### JSON Editor (Advanced Users)
Edit the raw JSON data directly in the Monaco editor. The editor provides:
- Syntax highlighting
- Auto-completion
- Error detection
- Real-time validation

### Step 4: Download Modified Save

1. Ensure your JSON is valid (check the status indicator)
2. Click **"Download Modified Save"** in the sidebar
3. Save the file as \`modified.dat\` or your preferred name

### Step 5: Replace Original File

1. **BACKUP YOUR ORIGINAL SAVE FIRST!**
2. Close Silksong completely
3. Navigate to your save file location
4. Replace \`user1.dat\` with your modified file
5. Start the game and enjoy your changes

## ⚠️ Important Safety Guidelines

### Always Create Backups
- **Never modify your original save file directly**
- Create multiple backup copies before making changes
- Store backups in a safe location outside the game directory

### Test Changes Gradually
- Make small changes first to test functionality
- Avoid making too many modifications at once
- Test each change in-game before making additional edits

### Validate Your JSON
- Ensure the JSON syntax is correct before downloading
- Use the built-in validation to check for errors
- Invalid JSON will corrupt your save file

## 🔧 Technical Details

### File Format
Silksong save files use a proprietary format:
1. **Binary Header**: C# serialization header
2. **Base64 Data**: Encrypted game data
3. **AES Encryption**: ECB mode with PKCS7 padding
4. **JSON Payload**: The actual game state data

### Encryption Specifications
- **Algorithm**: AES-256
- **Mode**: ECB (Electronic Codebook)
- **Padding**: PKCS7
- **Key**: Fixed 32-character key from game files

### Data Structure
The JSON contains several main sections:
- \`playerData\`: Character stats, position, abilities
- \`gameData\`: World state, completed areas, unlocks
- \`settings\`: Game preferences and configuration
- \`saveSlot\`: Save file metadata

## 🛡️ Security Features

### File Validation
- Automatic format detection
- Header verification
- Encryption integrity checks
- JSON structure validation

### Safe Editing
- Real-time syntax checking
- Automatic error detection
- Rollback capabilities
- Non-destructive editing process

## 🎯 Common Modifications

### Character Enhancements
- **Health**: Modify \`playerData.health\` and \`playerData.maxHealth\`
- **Soul**: Edit \`playerData.soul\` and \`playerData.maxSoul\`
- **Geo**: Change \`playerData.geo\` for currency
- **Position**: Adjust \`playerData.position\` for teleportation

### Abilities & Items
- **Movement**: Enable \`playerData.infiniteAirJump\`
- **Collectibles**: Modify items in \`playerData.Collectables.savedData\`
- **Charms**: Edit charm collections and notches
- **Spells**: Unlock or upgrade magical abilities

### World State
- **Areas**: Mark regions as discovered or completed
- **NPCs**: Modify conversation states
- **Enemies**: Adjust defeated status
- **Secrets**: Reveal hidden areas or items

## 🐛 Troubleshooting

### File Won't Load
- Verify the file is a valid \`.dat\` save file
- Check that the file isn't corrupted
- Ensure you're using the correct save slot

### JSON Errors
- Use the built-in syntax checker
- Look for missing commas, brackets, or quotes
- Validate number formats and boolean values

### Game Won't Load Save
- Verify JSON structure is intact
- Check that modified values are within acceptable ranges
- Restore from backup if issues persist

### Performance Issues
- Close other browser tabs to free memory
- Use smaller edit sessions for large files
- Clear browser cache if editor becomes unresponsive

## 🔗 Additional Resources

### Community Support
- **GitHub Repository**: Report bugs and request features
- **Discord Community**: Get help from other users
- **Official Documentation**: Technical specifications

### Development
This tool is open-source and contributions are welcome:
- Built with React, TypeScript, and Monaco Editor
- Uses modern cryptographic libraries
- Follows web security best practices

---

**⚠️ Disclaimer**: This tool is not affiliated with Team Cherry. Use at your own risk and always backup your save files before making modifications.
`;

const chineseContent = `
# 丝之歌存档编辑器 - 完整使用指南

## 🎮 工具介绍

**丝之歌存档编辑器** 是一个专为《空洞骑士：丝之歌》设计的专业网页版存档编辑工具。它提供了安全、用户友好的界面来修改游戏数据，同时保持文件完整性。

## 🚀 快速开始

### 第一步：找到您的存档文件

丝之歌存档文件根据操作系统存储在不同位置：

#### Windows 系统
\`\`\`
%USERPROFILE%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/{SteamID}/user1.dat
\`\`\`

#### macOS 系统
\`\`\`
~/Library/Application Support/unity.Team-Cherry.Silksong/{SteamID}/user1.dat
\`\`\`

#### Linux 系统
\`\`\`
~/.config/unity3d/Team Cherry/Hollow Knight Silksong/{SteamID}/user1.dat
\`\`\`

> **注意：** 将 \`{SteamID}\` 替换为您的实际 Steam ID 号码。

### 第二步：上传存档文件

1. 点击侧边栏中的 **"上传存档文件"** 按钮
2. 从文件浏览器中选择您的 \`.dat\` 文件
3. 等待文件处理和解码完成
4. 您的存档数据将显示在 JSON 编辑器中

### 第三步：编辑数据

您可以通过两种方式修改存档数据：

#### 快捷操作（推荐新手使用）
使用侧边栏中的 **快捷操作** 面板编辑常用数值：
- **无限跳跃**：启用无限空中跳跃能力
- **念珠数量**：修改您的货币（geo）
- **忆境纪念盒**：增殖孔位解锁器物品
- **大型念珠串**：使用时能增加 220 个念珠
- **大型碎骨片包**：使用时增加 200 个碎骨片

#### JSON 编辑器（高级用户）
直接在 Monaco 编辑器中编辑原始 JSON 数据。编辑器提供：
- 语法高亮
- 自动补全
- 错误检测
- 实时验证

### 第四步：下载修改后的存档

1. 确保您的 JSON 有效（检查状态指示器）
2. 点击侧边栏中的 **"下载修改后的存档"**
3. 将文件保存为 \`modified.dat\` 或您偏好的名称

### 第五步：替换原始文件

1. **首先备份您的原始存档！**
2. 完全关闭丝之歌游戏
3. 导航到您的存档文件位置
4. 用修改后的文件替换 \`user1.dat\`
5. 启动游戏并享受您的修改

## ⚠️ 重要安全指南

### 始终创建备份
- **绝不直接修改原始存档文件**
- 在进行更改前创建多个备份副本
- 将备份存储在游戏目录外的安全位置

### 逐步测试更改
- 首先进行小的更改来测试功能
- 避免一次进行太多修改
- 在进行额外编辑前在游戏中测试每个更改

### 验证您的 JSON
- 确保 JSON 语法在下载前是正确的
- 使用内置验证检查错误
- 无效的 JSON 会损坏您的存档文件

## 🔧 技术详情

### 文件格式
丝之歌存档文件使用专有格式：
1. **二进制头部**：C# 序列化头部
2. **Base64 数据**：加密的游戏数据
3. **AES 加密**：ECB 模式与 PKCS7 填充
4. **JSON 负载**：实际的游戏状态数据

### 加密规范
- **算法**：AES-256
- **模式**：ECB（电子密码本）
- **填充**：PKCS7
- **密钥**：来自游戏文件的固定 32 字符密钥

### 数据结构
JSON 包含几个主要部分：
- \`playerData\`：角色状态、位置、能力
- \`gameData\`：世界状态、完成区域、解锁内容
- \`settings\`：游戏偏好和配置
- \`saveSlot\`：存档文件元数据

## 🛡️ 安全功能

### 文件验证
- 自动格式检测
- 头部验证
- 加密完整性检查
- JSON 结构验证

### 安全编辑
- 实时语法检查
- 自动错误检测
- 回滚功能
- 非破坏性编辑过程

## 🎯 常见修改

### 角色增强
- **生命值**：修改 \`playerData.health\` 和 \`playerData.maxHealth\`
- **灵魂**：编辑 \`playerData.soul\` 和 \`playerData.maxSoul\`
- **念珠**：更改 \`playerData.geo\` 货币数量
- **位置**：调整 \`playerData.position\` 进行传送

### 能力与物品
- **移动**：启用 \`playerData.infiniteAirJump\`
- **收集品**：修改 \`playerData.Collectables.savedData\` 中的物品
- **护符**：编辑护符收集和凹槽
- **法术**：解锁或升级魔法能力

### 世界状态
- **区域**：标记地区为已发现或已完成
- **NPC**：修改对话状态
- **敌人**：调整击败状态
- **秘密**：揭示隐藏区域或物品

## 🐛 故障排除

### 文件无法加载
- 验证文件是有效的 \`.dat\` 存档文件
- 检查文件是否已损坏
- 确保您使用的是正确的存档槽位

### JSON 错误
- 使用内置语法检查器
- 查找缺失的逗号、括号或引号
- 验证数字格式和布尔值

### 游戏无法加载存档
- 验证 JSON 结构完整
- 检查修改的值是否在可接受范围内
- 如果问题持续，从备份恢复

### 性能问题
- 关闭其他浏览器标签页以释放内存
- 对大文件使用较小的编辑会话
- 如果编辑器无响应，清除浏览器缓存

## 🔗 其他资源

### 社区支持
- **GitHub 仓库**：报告错误和请求功能
- **Discord 社区**：从其他用户获得帮助
- **官方文档**：技术规范

### 开发
此工具是开源的，欢迎贡献：
- 使用 React、TypeScript 和 Monaco Editor 构建
- 使用现代加密库
- 遵循网络安全最佳实践

---

**⚠️ 免责声明**：此工具与 Team Cherry 无关。使用风险自负，在进行修改前请务必备份您的存档文件。
`;

export function HelpGuide() {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  
  return (
    <div className="h-full overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for better integration with our design system
          h1: ({ children }) => <h1 className="text-2xl font-bold text-primary mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mb-3 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium text-foreground mb-2 mt-4">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-medium text-foreground mb-2 mt-3">{children}</h4>,
          p: ({ children }) => <p className="text-muted-foreground mb-3 leading-relaxed">{children}</p>,
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <code className="block bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto border">
                  {children}
                </code>
              );
            }
            return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 bg-muted/50 p-3 rounded-r-md my-4">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
          hr: () => <hr className="border-border my-6" />,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
        }}
      >
        {isEnglish ? englishContent : chineseContent}
      </ReactMarkdown>
    </div>
  );
}