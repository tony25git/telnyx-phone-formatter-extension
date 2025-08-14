document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const phoneNumbersTextarea = document.getElementById('phoneNumbers');
    const formatDashBtn = document.getElementById('formatDashBtn');
    const formatSpaceBtn = document.getElementById('formatSpaceBtn');
    const formatRangeBtn = document.getElementById('formatRangeBtn');
    const formatPlusOneBtn = document.getElementById('formatPlusOneBtn');
    const formatOneBtn = document.getElementById('formatOneBtn');
    const formatSimpleBtn = document.getElementById('formatSimpleBtn');
    const copyBtn = document.getElementById('copyBtn');
    const undoBtn = document.getElementById('undoBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Custom format elements
    const buttonContainer = document.getElementById('buttonContainer');
    const formatTitle = document.getElementById('formatTitle');
    const formatPattern = document.getElementById('formatPattern');
    const addFormatBtn = document.getElementById('addFormatBtn');
    const customFormatsSelect = document.getElementById('customFormatsSelect');
    const editFormatBtn = document.getElementById('editFormatBtn');
    const deleteFormatBtn = document.getElementById('deleteFormatBtn');
    const manageFormatsSection = document.getElementById('manageFormatsSection');
    const collapseToggle = document.getElementById('collapseToggle');
    const customFormatsContent = document.getElementById('customFormatsContent');
    
    // History management
    let history = [];
    const MAX_HISTORY = 10;
    
    // Custom formats storage
    let customFormats = {};
    let editingFormatId = null;
    
    console.log('Phone Formatter extension loaded');
    
    // Save current state to history
    function saveToHistory() {
        const currentText = phoneNumbersTextarea.value;
        history.push(currentText);
        if (history.length > MAX_HISTORY) {
            history.shift(); // Remove oldest entry
        }
        console.log('Saved to history. History length:', history.length);
    }
    
    // Extract valid phone numbers from input
    function getNumbers() {
        const text = phoneNumbersTextarea.value;
        const lines = text.split('\n').filter(line => line.trim());
        const numbers = [];
        
        for (let line of lines) {
            // Remove all non-digit characters
            const cleanNum = line.replace(/[^\d]/g, '');
            if (cleanNum.length >= 10) {
                // Get rightmost 10 digits
                const rightmost10 = cleanNum.slice(-10);
                numbers.push(rightmost10);
            }
        }
        
        console.log('Extracted numbers:', numbers);
        return numbers;
    }
    
    // Find consecutive ranges in phone numbers
    function findConsecutiveRanges(numbers) {
        if (!numbers.length) return [];
        
        // Convert to integers and sort
        const numInts = numbers.map(num => parseInt(num)).sort((a, b) => a - b);
        const ranges = [];
        let start = numInts[0];
        let end = numInts[0];
        
        for (let i = 1; i < numInts.length; i++) {
            if (numInts[i] === end + 1) {
                // Consecutive number found
                end = numInts[i];
            } else {
                // End of consecutive sequence
                if (start === end) {
                    // Single number
                    ranges.push(start.toString().padStart(10, '0'));
                } else {
                    // Range
                    ranges.push(`${start.toString().padStart(10, '0')}-${end.toString().padStart(10, '0')}`);
                }
                start = end = numInts[i];
            }
        }
        
        // Add the last range/number
        if (start === end) {
            ranges.push(start.toString().padStart(10, '0'));
        } else {
            ranges.push(`${start.toString().padStart(10, '0')}-${end.toString().padStart(10, '0')}`);
        }
        
        console.log('Consecutive ranges:', ranges);
        return ranges;
    }
    
    // Show message to user
    function showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        // Insert message before button container
        const buttonContainer = document.querySelector('.button-container');
        buttonContainer.parentNode.insertBefore(messageDiv, buttonContainer);
        
        // Auto-remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
    
    // Format numbers with dashes (888-888-8888)
    function formatDashes() {
        console.log('Formatting with dashes');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        const ranges = findConsecutiveRanges(numbers);
        const formatted = ranges.map(range => {
            if (range.includes('-')) {
                // Handle range format
                const [start, end] = range.split('-');
                const startFormatted = `${start.slice(0,3)}-${start.slice(3,6)}-${start.slice(6)}`;
                const endLastFour = end.slice(6);
                return `${startFormatted}-${endLastFour}`;
            } else {
                // Single number
                return `${range.slice(0,3)}-${range.slice(3,6)}-${range.slice(6)}`;
            }
        });
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers with dash format`);
    }
    
    // Format numbers with spaces (888 888 8888)
    function formatSpaces() {
        console.log('Formatting with spaces');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        const ranges = findConsecutiveRanges(numbers);
        const formatted = ranges.map(range => {
            if (range.includes('-')) {
                // Handle range format
                const [start, end] = range.split('-');
                const area = start.slice(0,3);
                const exchange = start.slice(3,6);
                const startLast4 = start.slice(6);
                const endLast4 = end.slice(6);
                return `${area} ${exchange} ${startLast4} ${endLast4}`;
            } else {
                // Single number
                return `${range.slice(0,3)} ${range.slice(3,6)} ${range.slice(6)}`;
            }
        });
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers with space format`);
    }
    
    // Format numbers as ranges (8888888888-8888)
    function formatRanges() {
        console.log('Formatting as ranges');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        const ranges = findConsecutiveRanges(numbers);
        const formatted = ranges.map(range => {
            if (range.includes('-')) {
                // Already a range - format as requested
                const [start, end] = range.split('-');
                return `${start}-${end.slice(6)}`;
            }
            // Single number - return as is
            return range;
        });
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers as ranges`);
    }
    
    // Format numbers with +1 prefix (no range formatting)
    function formatPlusOne() {
        console.log('Formatting with +1 prefix');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        // Format each number individually with +1 prefix (no ranges)
        const formatted = numbers.map(num => `+1${num}`);
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers with +1 prefix`);
    }
    
    // Format numbers with 1 prefix (no range formatting)
    function formatOne() {
        console.log('Formatting with 1 prefix');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        // Format each number individually with 1 prefix (no ranges)
        const formatted = numbers.map(num => `1${num}`);
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers with 1 prefix`);
    }
    
    // Format numbers as simple 10-digit numbers (no range formatting)
    function formatSimple() {
        console.log('Formatting as simple 10-digit numbers');
        saveToHistory();
        
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        // Simply return the 10-digit numbers (no ranges)
        phoneNumbersTextarea.value = numbers.join('\n');
        showMessage(`Formatted ${numbers.length} numbers as simple 10-digit numbers`);
    }
    
    // Copy all numbers to clipboard
    function copyToClipboard() {
        const text = phoneNumbersTextarea.value;
        
        if (!text.trim()) {
            showMessage('No text to copy!', 'error');
            return;
        }
        
        // Use the Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    showMessage('Numbers copied to clipboard!');
                    // Change button text temporarily
                    copyBtn.textContent = 'Copied!';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy All Numbers';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    fallbackCopy();
                });
        } else {
            fallbackCopy();
        }
    }
    
    // Fallback copy method for older browsers
    function fallbackCopy() {
        phoneNumbersTextarea.select();
        phoneNumbersTextarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showMessage('Numbers copied to clipboard!');
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Copy All Numbers';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } else {
                showMessage('Failed to copy!', 'error');
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            showMessage('Failed to copy!', 'error');
        }
        
        // Deselect the text
        window.getSelection().removeAllRanges();
    }
    
    // Undo last action
    function undoAction() {
        console.log('Undoing action');
        if (history.length === 0) {
            showMessage('No actions to undo!', 'error');
            return;
        }
        
        const previousState = history.pop();
        phoneNumbersTextarea.value = previousState;
        showMessage('Action undone');
    }
    
    // Clear all text
    function clearText() {
        console.log('Clearing text');
        saveToHistory();
        phoneNumbersTextarea.value = '';
        showMessage('Text cleared');
    }
    
    // Custom Format Functions
    
    // Load custom formats from storage
    function loadCustomFormats() {
        chrome.storage.local.get(['customFormats'], function(result) {
            customFormats = result.customFormats || {};
            
            // Remove any custom formats with reserved names
            const reservedNames = ['+1', '1', 'Simple', 'simple', 'SIMPLE'];
            let hasChanges = false;
            
            Object.keys(customFormats).forEach(formatId => {
                const format = customFormats[formatId];
                if (reservedNames.includes(format.title) || reservedNames.includes(format.title.trim())) {
                    console.log('Removing reserved custom format:', format.title);
                    delete customFormats[formatId];
                    hasChanges = true;
                }
            });
            
            // Save changes if any reserved formats were removed
            if (hasChanges) {
                saveCustomFormats();
            }
            
            console.log('Loaded custom formats:', customFormats);
            updateCustomFormatsDropdown();
            generateCustomFormatButtons();
        });
    }
    
    // Save custom formats to storage
    function saveCustomFormats() {
        chrome.storage.local.set({ customFormats: customFormats }, function() {
            console.log('Custom formats saved');
        });
    }
    
    // Apply custom format for individual numbers (10 X's)
    function applyCustomFormatIndividual(phoneNumber, pattern) {
        let result = '';
        let digitIndex = 0;
        
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X' && digitIndex < phoneNumber.length) {
                result += phoneNumber[digitIndex];
                digitIndex++;
            } else if (pattern[i] !== 'X') {
                result += pattern[i];
            }
        }
        return result;
    }
    
    // Apply custom format for ranges (14+ X's)
    function applyCustomFormatRange(startNumber, endNumber, pattern) {
        console.log('Applying range format:', startNumber, 'to', endNumber, 'with pattern:', pattern);
        
        const xCount = (pattern.match(/X/g) || []).length;
        
        if (xCount === 14) {
            // 14 X's: First 10 digits + last 4 of end number
            // Example: XXX*XXX*XXXX*XXXX -> 987*654*3210*3211
            const startFormatted = applyPatternToDigits(startNumber, pattern.substring(0, getFirstTenXsEndIndex(pattern)));
            const endLastFour = endNumber.slice(-4);
            const lastFourSeparatorAndPattern = getLastFourXsWithSeparator(pattern);
            const endFormatted = applyPatternToDigits(endLastFour, lastFourSeparatorAndPattern);
            
            return startFormatted + endFormatted;
            
        } else if (xCount >= 20) {
            // 20 X's: Full start number + full end number
            // Example: XX/XXX/XXXXX/XX/XXX/XXXXX -> 98/765/43210/98/765/43218
            const firstHalfPattern = getFirstNXs(pattern, 10);
            const secondHalfPattern = getLastNXs(pattern, 10);
            
            const startFormatted = applyPatternToDigits(startNumber, firstHalfPattern);
            const endFormatted = applyPatternToDigits(endNumber, secondHalfPattern);
            
            return startFormatted + endFormatted;
            
        } else {
            // Fallback for other X counts >= 14
            return applyCustomFormatIndividual(startNumber, pattern);
        }
    }
    
    // Helper function to get the end index of the first 10 X's
    function getFirstTenXsEndIndex(pattern) {
        let xCount = 0;
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X') {
                xCount++;
                if (xCount === 10) {
                    return i + 1; // Return position after the 10th X
                }
            }
        }
        return pattern.length;
    }
    
    // Helper function to get the last 4 X's with their preceding separator
    function getLastFourXsWithSeparator(pattern) {
        const xPositions = [];
        
        // Find all X positions
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X') {
                xPositions.push(i);
            }
        }
        
        if (xPositions.length < 14) return 'XXXX';
        
        // Get position of the 11th X (start of last 4 X's)
        const eleventhXPos = xPositions[10];
        
        // Find the separator before the 11th X
        let separatorStart = eleventhXPos - 1;
        while (separatorStart >= 0 && pattern[separatorStart] !== 'X') {
            separatorStart--;
        }
        separatorStart++; // Move to first non-X character
        
        // Return the separator + last 4 X's pattern
        return pattern.substring(separatorStart);
    }
    
    // Helper function to get only the first 10 X pattern for individual numbers
    function getFirst10XPattern(pattern) {
        let result = '';
        let xCount = 0;
        
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X') {
                xCount++;
                result += 'X';
                if (xCount === 10) {
                    break; // Stop after 10th X, don't include trailing separators
                }
            } else {
                result += pattern[i];
            }
        }
        
        return result;
    }
    
    // Helper function to get first N X's and their surrounding pattern
    function getFirstNXs(pattern, n) {
        let result = '';
        let xCount = 0;
        
        for (let i = 0; i < pattern.length && xCount < n; i++) {
            if (pattern[i] === 'X') {
                xCount++;
                result += 'X';
            } else {
                result += pattern[i];
            }
        }
        
        // Add any separators that come after the nth X
        let afterNthX = false;
        xCount = 0;
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X') {
                xCount++;
                if (xCount === n) {
                    afterNthX = true;
                    continue;
                }
            }
            if (afterNthX && pattern[i] !== 'X') {
                result += pattern[i];
                break;
            }
        }
        
        return result;
    }
    
    // Helper function to get last N X's and their surrounding pattern
    function getLastNXs(pattern, n) {
        const xPositions = [];
        
        // Find all X positions
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X') {
                xPositions.push(i);
            }
        }
        
        if (xPositions.length < n) return pattern;
        
        // Get the start position for the last n X's
        const startPos = xPositions[xPositions.length - n];
        
        // Find any separator before the start position
        let separatorBefore = '';
        for (let i = startPos - 1; i >= 0; i--) {
            if (pattern[i] !== 'X') {
                separatorBefore = pattern[i] + separatorBefore;
                break;
            }
        }
        
        // Extract the pattern from start position to end
        const endPart = pattern.substring(startPos);
        
        return separatorBefore + endPart;
    }
    
    // Helper function to apply pattern to digits
    function applyPatternToDigits(digits, pattern) {
        let result = '';
        let digitIndex = 0;
        
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === 'X' && digitIndex < digits.length) {
                result += digits[digitIndex];
                digitIndex++;
            } else if (pattern[i] !== 'X') {
                result += pattern[i];
            }
        }
        
        return result;
    }
    
    // Format numbers with custom pattern
    function formatCustom(formatId) {
        console.log('Formatting with custom format:', formatId);
        const format = customFormats[formatId];
        if (!format) return;
        
        saveToHistory();
        const numbers = getNumbers();
        if (!numbers.length) {
            showMessage('No valid numbers with at least 10 digits found!', 'error');
            return;
        }
        
        const xCount = (format.pattern.match(/X/g) || []).length;
        console.log('Custom format X count:', xCount);
        
        let formatted = [];
        
        if (xCount === 10) {
            // 10 X's: Individual formatting only (no ranges)
            console.log('Using individual formatting (10 X\'s)');
            formatted = numbers.map(num => applyCustomFormatIndividual(num, format.pattern));
            
        } else if (xCount >= 14) {
            // 14+ X's: Smart range formatting enabled
            console.log('Using smart range formatting (14+ X\'s)');
            const ranges = findConsecutiveRanges(numbers);
            formatted = ranges.map(range => {
                if (range.includes('-')) {
                    // Handle range with smart formatting
                    const [start, end] = range.split('-');
                    return applyCustomFormatRange(start, end, format.pattern);
                } else {
                    // Single number - use only first 10 X pattern for individual numbers
                    const individualPattern = getFirst10XPattern(format.pattern);
                    return applyCustomFormatIndividual(range, individualPattern);
                }
            });
        }
        
        phoneNumbersTextarea.value = formatted.join('\n');
        showMessage(`Formatted ${numbers.length} numbers with ${format.title}`);
    }
    
    // Add new custom format
    function addCustomFormat() {
        const title = formatTitle.value.trim();
        const pattern = formatPattern.value.trim();
        
        if (!title || !pattern) {
            showMessage('Please enter both title and pattern', 'error');
            return;
        }
        
        // Check for reserved names
        const reservedNames = ['+1', '1', 'Simple', 'simple', 'SIMPLE'];
        if (reservedNames.includes(title)) {
            showMessage('Cannot use reserved format names: +1, 1, or Simple', 'error');
            return;
        }
        
        // Validate pattern (must contain at least 10 X's for basic phone numbers)
        const xCount = (pattern.match(/X/g) || []).length;
        if (xCount < 10) {
            showMessage('Pattern must contain at least 10 X\'s for basic phone numbers', 'error');
            return;
        }
        
        // Validate pattern logic based on X count
        if (xCount === 10) {
            // 10 X's: Individual formatting only (no ranges)
        } else if (xCount >= 14) {
            // 14+ X's: Smart range formatting enabled
        } else if (xCount > 10 && xCount < 14) {
            showMessage('Pattern with ' + xCount + ' X\'s not supported. Use exactly 10 X\'s for individual formatting or 14+ X\'s for range formatting.', 'error');
            return;
        }
        
        const formatId = editingFormatId || Date.now().toString();
        
        customFormats[formatId] = {
            title: title,
            pattern: pattern
        };
        
        saveCustomFormats();
        updateCustomFormatsDropdown();
        generateCustomFormatButtons();
        
        const isEditing = editingFormatId !== null;
        
        // Clear form
        formatTitle.value = '';
        formatPattern.value = '';
        editingFormatId = null;
        
        showMessage(isEditing ? 'Format updated successfully' : 'Format added successfully');
    }
    
    // Update custom formats dropdown
    function updateCustomFormatsDropdown() {
        customFormatsSelect.innerHTML = '<option value="">Select a custom format...</option>';
        
        Object.keys(customFormats).forEach(formatId => {
            const format = customFormats[formatId];
            const option = document.createElement('option');
            option.value = formatId;
            option.textContent = `${format.title} (${format.pattern})`;
            customFormatsSelect.appendChild(option);
        });
        
        // Show/hide manage section based on whether there are custom formats
        if (Object.keys(customFormats).length > 0) {
            manageFormatsSection.style.display = 'block';
        } else {
            manageFormatsSection.style.display = 'none';
        }
    }
    
    // Generate custom format buttons
    function generateCustomFormatButtons() {
        // Remove existing custom format buttons
        const existingCustomButtons = buttonContainer.querySelectorAll('.custom-format-btn');
        existingCustomButtons.forEach(btn => btn.remove());
        
        // Add new custom format buttons with cycling colors
        const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
        let colorIndex = 0;
        
        Object.keys(customFormats).forEach(formatId => {
            const format = customFormats[formatId];
            const button = document.createElement('button');
            button.className = `custom-format-btn ${colorClasses[colorIndex]}`;
            button.textContent = format.title;
            button.addEventListener('click', () => formatCustom(formatId));
            
            // Append to the main button container
            buttonContainer.appendChild(button);
            
            // Cycle through colors
            colorIndex = (colorIndex + 1) % colorClasses.length;
        });
    }
    
    // Edit selected custom format
    function editCustomFormat() {
        const selectedFormatId = customFormatsSelect.value;
        if (!selectedFormatId) {
            showMessage('Please select a format to edit', 'error');
            return;
        }
        
        const format = customFormats[selectedFormatId];
        formatTitle.value = format.title;
        formatPattern.value = format.pattern;
        editingFormatId = selectedFormatId;
        
        showMessage('Format loaded for editing');
    }
    
    // Delete selected custom format
    function deleteCustomFormat() {
        const selectedFormatId = customFormatsSelect.value;
        if (!selectedFormatId) {
            showMessage('Please select a format to delete', 'error');
            return;
        }
        
        const format = customFormats[selectedFormatId];
        if (confirm(`Delete format "${format.title}"?`)) {
            delete customFormats[selectedFormatId];
            saveCustomFormats();
            updateCustomFormatsDropdown();
            generateCustomFormatButtons();
            showMessage('Format deleted successfully');
        }
    }
    
    // Toggle custom formats section visibility
    function toggleCustomFormatsSection() {
        const isCollapsed = customFormatsContent.classList.contains('collapsed');
        
        if (isCollapsed) {
            customFormatsContent.classList.remove('collapsed');
            collapseToggle.textContent = '-';
        } else {
            customFormatsContent.classList.add('collapsed');
            collapseToggle.textContent = '+';
        }
    }
    
    // Event listeners
    formatDashBtn.addEventListener('click', formatDashes);
    formatSpaceBtn.addEventListener('click', formatSpaces);
    formatRangeBtn.addEventListener('click', formatRanges);
    formatPlusOneBtn.addEventListener('click', formatPlusOne);
    formatOneBtn.addEventListener('click', formatOne);
    formatSimpleBtn.addEventListener('click', formatSimple);
    copyBtn.addEventListener('click', copyToClipboard);
    undoBtn.addEventListener('click', undoAction);
    clearBtn.addEventListener('click', clearText);
    
    // Custom format event listeners
    addFormatBtn.addEventListener('click', addCustomFormat);
    editFormatBtn.addEventListener('click', editCustomFormat);
    deleteFormatBtn.addEventListener('click', deleteCustomFormat);
    collapseToggle.addEventListener('click', toggleCustomFormatsSection);
    
    // Save initial state to history when text is first entered
    phoneNumbersTextarea.addEventListener('input', function() {
        // Only save to history if this is the first time text is entered
        if (this.value.trim() && history.length === 0) {
            console.log('Saving initial state to history');
            history.push(''); // Empty initial state
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Z or Cmd+Z for undo (when not focused on textarea)
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.target !== phoneNumbersTextarea) {
            e.preventDefault();
            undoAction();
        }
        
        // Escape to clear (when not focused on textarea)
        if (e.key === 'Escape' && e.target !== phoneNumbersTextarea) {
            clearText();
        }
    });
    
    // Initialize custom formats
    loadCustomFormats();
    
    // Focus textarea on load
    phoneNumbersTextarea.focus();
    
    console.log('Phone Formatter extension initialized');
});