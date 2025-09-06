# Silksong Save Editor

A save file editor for Hollow Knight: Silksong with an intuitive json editor interface. Decode, modify, and encode save files with ease.

## 🎮 Demo

Try the live demo: **[https://silksong-save-editor.vercel.com](https://silksong-save-editor.vercel.com)**

## ✨ Features

- **Professional Monaco Editor**: Syntax highlighting and IntelliSense for JSON editing
- **Binary Save File Support**: Decode and encode Silksong .dat save files
- **Multi-language Support**: Available in English and Chinese
- **Quick Actions**: Instant editing for common save data fields (Rosary Beads/Geo)
- **Real-time Validation**: JSON syntax validation with error highlighting
- **Backup Reminders**: Built-in warnings to protect your original save files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Usage

### Online (Recommended)

1. Visit [https://silksong-save-editor.vercel.com](https://silksong-save-editor.vercel.com)
2. Upload your dat save file
3. Edit the JSON data using the Monaco editor
4. Download your modified save file
5. Replace the original file (backup first!)

### Save File Locations

- **Windows**: `C:\Users\[Username]\AppData\LocalLow\Team Cherry\Hollow Knight Silksong\`
- **macOS**: `~/Library/Application Support/unity.Team Cherry.Hollow Knight Silksong/`
- **Linux**: `~/.config/unity3d/Team Cherry/Hollow Knight Silksong/`

### Safety Tips

- **Always backup your original save files** before making any modifications
- Test changes on a copy first
- Ensure JSON syntax is valid before downloading
- The editor validates common fields like `playerData.geo` (Rosary Beads)

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Key Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 📝 License

This project is open source and available under the MIT License.
