# Silksong Save Editor

A professional save file editor for Hollow Knight: Silksong with an intuitive Monaco editor interface. Decode, modify, and encode save files with ease.

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
2. Upload your `user1.dat` save file
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
# Clone the repository
git clone <YOUR_GIT_URL>
cd silksong-save-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── MonacoEditor.tsx    # Main editor component
│   ├── SaveEditorSidebar.tsx # Sidebar with controls
│   └── ...
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── utils/              # Utility functions
│   └── saveDecoder.ts  # Save file encoding/decoding
└── pages/              # Application pages
```

### Key Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - VS Code editor component
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **i18next** - Internationalization framework
- **CryptoJS** - Cryptographic functions for save file handling

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6b3dfcdd-0b07-47bc-a8d8-82cec95876f9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
