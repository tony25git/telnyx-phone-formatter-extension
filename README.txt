TELNYX PHONE NUMBER FORMATTER - CHROME EXTENSION
==============================================

INSTALLATION INSTRUCTIONS
=========================

1. Download the Zip file and extract all files to a safe location in your computer:
   - manifest.json
   - popup.html
   - popup.css
   - popup.js
   - Icon.png

2. Open Chrome browser and navigate to chrome://extensions/

3. Enable "Developer mode" by clicking the toggle switch in the top-right corner

4. Click "Load unpacked" button

5. Select the folder containing all the extension files

6. The Telnyx Phone Number Formatter extension should now appear in your extensions list

7. Pin the extension to your toolbar by clicking the puzzle piece icon and pinning "Telnyx Phone Number Formatter"


HOW TO USE THE EXTENSION
========================

This extension helps you format phone numbers in multiple standard formats with both range and individual formatting options, plus advanced custom formatting capabilities.

BASIC USAGE:
1. Click the Phone Formatter extension icon in your browser toolbar
2. Paste or type phone numbers into the text area (one per line)
3. Click the green "Copy All Numbers" button below the text area to copy formatted numbers
4. Choose your desired formatting option from the 6 available buttons
5. Use Undo to revert the last action
6. Use Clear to remove all text


FORMATTING BUTTONS
==================

The extension provides 6 format buttons with different colors for easy identification:

1. **888-888-8888** (Light Green Button):
   - Formats numbers with dashes
   - Supports range formatting for consecutive numbers
   - Single: 5551234567 → 555-123-4567
   - Range: 5551234567-69 → 555-123-4567-4569

2. **888 888 8888** (Light Blue Button):
   - Formats numbers with spaces
   - Supports range formatting for consecutive numbers
   - Single: 5551234567 → 555 123 4567
   - Range: 5551234567-69 → 555 123 4567 4569

3. **8888888888-8888** (Light Orange Button):
   - Creates compact range format
   - Groups consecutive numbers automatically
   - Single: 5551234567 → 5551234567
   - Range: 5551234567-69 → 5551234567-4569

4. **+1** (Light Purple Button):
   - Adds +1 country code prefix
   - NO range formatting - each number listed individually
   - Example: 5551234567 → +15551234567

5. **1** (Cyan Button):
   - Adds 1 prefix (without plus sign)
   - NO range formatting - each number listed individually
   - Example: 5551234567 → 15551234567

6. **Simple** (Gray Button):
   - Shows plain 10-digit numbers only
   - NO range formatting - each number listed individually
   - Removes all formatting and prefixes
   - Example: (555) 123-4567 → 5551234567


ADDITIONAL FEATURES
==================

COPY BUTTON:
- Large green button located directly below the text area
- Copies all numbers in their current format to clipboard
- Shows "Copied!" confirmation when successful
- Works with any format currently displayed

UNDO/CLEAR BUTTONS:
- **Undo**: Reverts the last formatting action (up to 10 actions)
- **Clear**: Removes all text from the input area

AUTOMATIC NUMBER PROCESSING:
- Extracts phone numbers from any format (with or without separators)
- Uses the rightmost 10 digits from each line
- Handles numbers with country codes or extra digits
- Filters out lines without at least 10 digits

CONSECUTIVE RANGE DETECTION:
- First 3 buttons (888-888-8888, 888 888 8888, 8888888888-8888) automatically detect consecutive numbers
- Groups them into ranges for efficient display
- Example: 5551234567, 5551234568, 5551234569 becomes a single range

KEYBOARD SHORTCUTS:
- Ctrl+Z (Windows) or Cmd+Z (Mac): Undo last action
- Escape: Clear all text
- Note: Shortcuts work when not typing in the text area


ADVANCED CUSTOM FORMATS
=======================

Create your own custom formatting patterns with intelligent range handling:

1. Click the "+" button next to "Custom Formats" to expand the section
2. Enter a Format Title (e.g., "Asterisk Format")
3. Enter a Format Pattern using X for digit placeholders
4. Click "Add Format" to save

CUSTOM FORMAT INTELLIGENCE:

**10 X Characters - Individual Formatting (No Ranges):**
- Each number formatted individually, one per line
- NO range grouping even for consecutive numbers
- Perfect for formats that should never group ranges
- Example Pattern: XXX*XXX*XXXX
- Input: 9876543210, 9876543211, 9876543212
- Output: 987*654*3210
         987*654*3211  
         987*654*3212

**14 X Characters - Smart Range Formatting:**
- Non-consecutive numbers: Individual formatting
- Consecutive numbers: Range format using pattern structure
- Uses first 10 X's for start number, last 4 X's for end number
- Example Pattern: XXX*XXX*XXXX*XXXX
- Input: 9876543210, 9876543212, 9876543214, 9876543215, 9876543216, 9876543217, 9876543218
- Output: 987*654*3210
         987*654*3212
         987*654*3214*3218

**20+ X Characters - Full Range Formatting:**
- Uses first 10 X's for start number, last 10 X's for end number
- Complete number formatting for both start and end of range
- Example Pattern: XX/XXX/XXXXX/XX/XXX/XXXXX
- Input: 9876543210, 9876543212, 9876543214, 9876543215, 9876543216, 9876543217, 9876543218
- Output: 98/765/43210
         98/765/43212
         98/765/43214/98/765/43218

PATTERN EXAMPLES BY TYPE:

**Individual Formatting (10 X's):**
- XXX.XXX.XXXX → 987.654.3210
- (XXX) XXX-XXXX → (987) 654-3210
- XXX XXX XXXX → 987 654 3210
- +1XXXXXXXXXX → +19876543210

**Smart Range Formatting (14 X's):**
- XXX*XXX*XXXX*XXXX → 987*654*3210*3218
- XXX-XXX-XXXX-XXXX → 987-654-3210-3218
- XXX.XXX.XXXX.XXXX → 987.654.3210.3218
- (XXX)XXX-XXXX-XXXX → (987)654-3210-3218

**Full Range Formatting (20+ X's):**
- XX/XXX/XXXXX/XX/XXX/XXXXX → 98/765/43210/98/765/43218
- XXX*XXX*XXXX*XXX*XXX*XXXX → 987*654*3210*987*654*3218
- +1XXXXXXXXXX+1XXXXXXXXXX → +19876543210+19876543218

PATTERN VALIDATION:
- Minimum 10 X characters required
- 11-13 X characters not supported (use 10 or 14+)
- Reserved names (+1, 1, Simple) cannot be used for format titles
- Pattern logic automatically determined by X character count

MANAGING CUSTOM FORMATS:
- Custom format buttons appear automatically with cycling colors
- Select a format from the dropdown to Edit or Delete
- Buttons are added to the main format button area
- Each custom format gets a unique color from the color cycle


EXAMPLES
========

INPUT (any format accepted):
```
5551234567
(555) 123-4568  
555.123.4569
+1 555 123 4570
1-555-123-4571
```

STANDARD FORMAT OUTPUTS:

888-888-8888 (with ranges):
```
555-123-4567-4571
```

888 888 8888 (with ranges):
```
555 123 4567 4571
```

8888888888-8888 (range format):
```
5551234567-4571
```

+1 (individual numbers):
```
+15551234567
+15551234568
+15551234569
+15551234570
+15551234571
```

1 (individual numbers):
```
15551234567
15551234568
15551234569
15551234570
15551234571
```

Simple (plain numbers):
```
5551234567
5551234568
5551234569
5551234570
5551234571
```

CUSTOM FORMAT EXAMPLES:

**10 X Pattern: XXX*XXX*XXXX (Individual)**
```
555*123*4567
555*123*4568
555*123*4569
555*123*4570
555*123*4571
```

**14 X Pattern: XXX*XXX*XXXX*XXXX (Smart Range)**
```
555*123*4567*4571
```

**20 X Pattern: XXX*XXX*XXXX*XXX*XXX*XXXX (Full Range)**
```
555*123*4567*555*123*4571
```


TROUBLESHOOTING
==============

NUMBERS NOT FORMATTING:
- Ensure each line has at least 10 digits
- Check that numbers are separated by line breaks
- Remove any extra characters that might interfere

COPY BUTTON NOT WORKING:
- Some browsers may require permission for clipboard access
- Try clicking the button again or use Ctrl+C after selecting text
- Check if popup blockers are interfering

NO VALID NUMBERS FOUND:
- Verify each line contains at least 10 consecutive digits
- Numbers can have separators, but must have 10+ digits total
- Try entering a simple 10-digit number to test

CUSTOM FORMAT NOT WORKING:
- Check that pattern has correct number of X characters (10, 14, or 20+)
- Avoid using 11-13 X characters (not supported)
- Ensure title doesn't use reserved names (+1, 1, Simple)
- Verify pattern has proper separators between X groups

UNDO NOT WORKING:
- Undo only works after formatting actions
- Maximum 10 actions can be undone
- Undo history resets when extension is closed

EXTENSION NOT LOADING:
- Check that all files are in the same folder
- Ensure Developer mode is enabled in chrome://extensions
- Try reloading the extension (disable/enable toggle)
- Check browser console for error messages

CUSTOM FORMATS NOT SAVING:
- Ensure pattern contains at least 10 X characters
- Avoid using reserved names (+1, 1, Simple)
- Check that both title and pattern fields are filled
- Try closing and reopening the extension


TECHNICAL DETAILS
================

PROCESSING LOGIC:
1. Split input text by line breaks
2. Extract digits from each line using regex
3. Keep only lines with 10+ digits
4. Take rightmost 10 digits from each valid line
5. For first 3 buttons: Convert to integers, sort, and group consecutive numbers
6. For +1, 1, Simple buttons: Process each number individually
7. For custom formats: Apply logic based on X character count
8. Apply selected formatting to each number/range

CUSTOM FORMAT PROCESSING:
- 10 X's: Individual formatting using direct pattern application
- 14 X's: Split pattern at 10th X, combine start + separator + end digits
- 20+ X's: Split pattern in half, format start and end numbers separately
- Range detection: Only applies to standard formats and 14+ X custom formats

SUPPORTED FORMATS:
- Input: Any format with 10+ digits per line
- Output: Six standardized formats plus unlimited custom patterns
- Range detection: Automatic for first 3 buttons and 14+ X custom formats
- Individual formatting: Last 3 buttons (+1, 1, Simple) and 10 X custom formats

DATA STORAGE:
- Custom formats stored locally in browser using Chrome storage API
- No data transmitted externally
- History maintained only during current session
- Extension requires only storage permission
- All processing happens locally in the browser

BROWSER COMPATIBILITY:
- Chrome (recommended)
- Edge (Chromium-based)
- Other Chromium-based browsers
- Requires Manifest V3 support

VERSION HISTORY:
- v1.0: Initial release with 6 format buttons, copy functionality, and custom formats
- v1.1: Reserved format names protection added
- v1.2: Improved button colors for better visibility
- v1.3: Advanced custom format logic with intelligent range handling:
  * 10 X's: Individual formatting (no ranges)
  * 14 X's: Smart range formatting (first 10 + last 4 digits)
  * 20+ X's: Full range formatting (complete start + complete end)
  * Pattern validation enhanced (11-13 X's not supported)
- v1.3.1: Fixed double separator issue in 14 X custom format ranges
  * Range formatting now produces correct single separator output
  * Example: XXX*XXX*XXXX*XXXX now correctly outputs 987*654*3210*3211


SUPPORT AND FEEDBACK
===================

For technical support or feature requests:
- Check the troubleshooting section above
- Verify you're using the latest version
- Test with simple 10-digit numbers first
- Report issues with specific pattern examples

For additional support, contact the Telnyx team.