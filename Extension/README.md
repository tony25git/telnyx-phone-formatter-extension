# 📱 Telnyx Phone Number Formatter

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=flat-square&logo=googlechrome)
![Edge Extension](https://img.shields.io/badge/Edge-Extension-blue?style=flat-square&logo=microsoftedge)
![Version](https://img.shields.io/badge/Version-1.3.1-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

A powerful Chrome/Edge extension for formatting phone numbers with intelligent range detection and advanced custom formatting patterns.

## ✨ Key Features

🎯 **6 Standard Format Buttons** - Quick access to common phone number formats  
🤖 **Intelligent Range Detection** - Automatically groups consecutive numbers  
🎨 **Advanced Custom Formats** - Create patterns with 10, 14, or 20+ X logic  
📋 **One-Click Copy** - Copy all formatted numbers to clipboard instantly  
↩️ **Undo/Redo Support** - Full action history (up to 10 actions)  
🔒 **Privacy-First** - All processing happens locally, no data transmitted  

## 🚀 Quick Start

### Install the Extension

1. **[📥 Download Latest Release](../../releases/latest)**
2. **Extract** the downloaded ZIP file
3. **Open Chrome/Edge** and go to `chrome://extensions/` or `edge://extensions/`
4. **Enable "Developer mode"** (toggle in top-right corner)
5. **Click "Load unpacked"** and select the extracted folder
6. **Pin the extension** to your toolbar for easy access

### Basic Usage

1. **Click the extension icon** in your browser toolbar
2. **Paste phone numbers** into the text area (any format, one per line)
3. **Choose a format** from the 6 colored buttons
4. **Click "Copy All Numbers"** to copy the results
5. **Use Undo** to revert any changes

## 🎨 Format Options

### Standard Formats

| Button | Example Output | Use Case |
|--------|---------------|----------|
| **888-888-8888** 🟢 | `555-123-4567-4571` | Standard dash format with ranges |
| **888 888 8888** 🔵 | `555 123 4567 4571` | Space-separated with ranges |
| **8888888888-8888** 🟠 | `5551234567-4571` | Compact range format |
| **+1** 🟣 | `+15551234567` *(individual)* | International format |
| **1** 🔘 | `15551234567` *(individual)* | US format with 1 prefix |
| **Simple** ⚫ | `5551234567` *(individual)* | Clean 10-digit numbers |

### Advanced Custom Formats

Create your own patterns with intelligent logic:

#### 🔹 **10 X Characters** - Individual Formatting
- **Logic**: Each number formatted separately, no ranges
- **Example**: `XXX*XXX*XXXX` → `987*654*3210`, `987*654*3211`, `987*654*3212`
- **Perfect for**: Formats that should never group consecutive numbers

#### 🔹 **14 X Characters** - Smart Range Formatting  
- **Logic**: Individual numbers separate, consecutive numbers become ranges
- **Example**: `XXX*XXX*XXXX*XXXX` → `987*654*3210*3218` *(for range 3210-3218)*
- **Perfect for**: Efficient range notation with custom separators

#### 🔹 **20+ X Characters** - Full Range Formatting
- **Logic**: Complete start and end numbers in ranges
- **Example**: `XX/XXX/XXXXX/XX/XXX/XXXXX` → `98/765/43210/98/765/43218`
- **Perfect for**: Full number visibility in complex formats

## 📊 Examples

### Input
```
5551234567
(555) 123-4568  
555.123.4569
+1 555 123 4570
1-555-123-4571
```

### Standard Format Outputs

**888-888-8888 (Range):**
```
555-123-4567-4571
```

**+1 (Individual):**
```
+15551234567
+15551234568
+15551234569
+15551234570
+15551234571
```

### Custom Format Examples

**Pattern: `XXX*XXX*XXXX` (10 X's - Individual)**
```
555*123*4567
555*123*4568
555*123*4569
555*123*4570
555*123*4571
```

**Pattern: `XXX*XXX*XXXX*XXXX` (14 X's - Smart Range)**
```
555*123*4567*4571
```

**Pattern: `XX/XXX/XXXXX/XX/XXX/XXXXX` (20 X's - Full Range)**
```
55/512/34567/55/512/34571
```

## 🛠️ Advanced Features

### Custom Format Creation
1. **Expand Custom Formats** section (click the + button)
2. **Enter Format Title** (e.g., "Asterisk Format")
3. **Enter Pattern** using X for digits (e.g., `XXX*XXX*XXXX`)
4. **Click "Add Format"** - your button appears automatically!

### Pattern Validation
- ✅ **10 X characters**: Individual formatting only
- ✅ **14+ X characters**: Smart range formatting enabled  
- ❌ **11-13 X characters**: Not supported (shows error)
- ❌ **Reserved names**: +1, 1, Simple cannot be used

### Keyboard Shortcuts
- **Ctrl+Z** (Windows) / **Cmd+Z** (Mac): Undo last action
- **Escape**: Clear all text
- *(Shortcuts work when not typing in the text area)*

## 📱 Screenshots

| Feature | Preview |
|---------|---------|
| **Main Interface** | *[Add screenshot showing the main extension popup]* |
| **Custom Formats** | *[Add screenshot showing custom format creation]* |
| **Format Results** | *[Add screenshot showing different format outputs]* |

## 🔧 Development & Contributing

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/telnyx-phone-formatter-extension.git
cd telnyx-phone-formatter-extension

# Load the extension/ folder in Chrome Developer mode
# Make your changes and test locally
```

### File Structure
```
extension/
├── manifest.json       # Extension configuration
├── popup.html         # Main interface
├── popup.css          # Styling
├── popup.js           # Core functionality
└── Icon.png          # Extension icon
```

### Contributing
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📋 Changelog

### v1.3.1 - Latest Release
- 🐛 **Fixed**: Double separator issue in 14 X custom format ranges
- 🐛 **Fixed**: Trailing separators on individual numbers in range patterns
- ✨ **Improved**: Individual number formatting for 14+ X patterns
- 📚 **Updated**: Comprehensive documentation

### v1.3.0 - Advanced Custom Formats
- 🎉 **New**: Advanced custom format logic (10, 14, 20+ X characters)
- 🎉 **New**: Intelligent range detection based on pattern complexity
- 🎉 **New**: Smart format validation (11-13 X patterns blocked)
- ✨ **Improved**: Pattern processing with helper functions
- 📚 **Added**: Detailed examples and documentation

### v1.2.0 - Visual Improvements
- 🎨 **Improved**: Button colors for better visibility and accessibility
- 🎨 **Updated**: Lighter, more modern color palette
- ✨ **Enhanced**: User interface responsiveness

### v1.1.0 - Format Protection
- 🔒 **Added**: Reserved format names protection (+1, 1, Simple)
- 🐛 **Fixed**: Duplicate custom format button creation
- ✨ **Improved**: Custom format management system

### v1.0.0 - Initial Release
- 🎉 **Launch**: 6 standard format buttons
- 🎉 **Launch**: Custom format creation system
- 🎉 **Launch**: Copy to clipboard functionality
- 🎉 **Launch**: Undo/redo support (10 action history)

[📜 View Full Release History](../../releases)

## 🆘 Troubleshooting

### Common Issues

**❓ Extension not loading?**
- Ensure Developer mode is enabled in Chrome/Edge extensions
- Select the folder containing `manifest.json` (not a subfolder)
- Try disabling and re-enabling the extension

**❓ Numbers not formatting?**
- Each line must contain at least 10 digits
- Separate multiple numbers with line breaks
- Remove extra characters that might interfere

**❓ Copy button not working?**
- Some browsers require permission for clipboard access
- Try clicking the button again
- Use Ctrl+C as fallback after selecting text

**❓ Custom format not working?**
- Check X character count (10, 14, or 20+ supported)
- Avoid 11-13 X characters (not supported)
- Don't use reserved names (+1, 1, Simple)

### Getting Help

- 🐛 **Report Bugs**: [Create an Issue](../../issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Create an Issue](../../issues/new?template=feature_request.md)
- 📖 **Documentation**: [Full README](README.txt)
- 💬 **Discussions**: [GitHub Discussions](../../discussions)

## 📄 Technical Details

### Browser Compatibility
- ✅ **Chrome** 88+ (Recommended)
- ✅ **Edge** (Chromium-based) 88+
- ✅ **Other Chromium browsers** with Manifest V3 support

### Privacy & Security
- 🔒 **No data transmission** - All processing happens locally
- 🔒 **Minimal permissions** - Only requires storage for custom formats
- 🔒 **No tracking** - Extension doesn't collect any user data
- 🔒 **Open source** - Full code transparency

### Performance
- ⚡ **Fast processing** - Handles thousands of numbers efficiently  
- 💾 **Low memory usage** - Optimized for performance
- 🔄 **Background processing** - Won't slow down your browsing

## 📞 About Telnyx

This extension was created to support Telnyx telecommunications workflows but is useful for anyone working with phone numbers.

**Learn more**: [telnyx.com](https://telnyx.com)

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for the telecommunications community

[🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues) · [💬 Discuss](../../discussions)

</div>