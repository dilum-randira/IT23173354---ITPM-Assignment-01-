# SwiftTranslator QA Test Suite

A comprehensive Playwright test suite for validating the SwiftTranslator web application, which translates Singlish (colloquial Sri Lankan English-Sinhala mix) to proper Sinhala script.

## Overview

This test suite validates the core translation functionality of SwiftTranslator using automated end-to-end tests. It covers positive scenarios, edge cases, and UI behavior.

**Application Under Test:** https://www.swifttranslator.com/

## Test Coverage

### Test Categories

The suite includes **36 total test cases** organized into three main categories:

#### 1. Positive Tests (25 cases)
Validate accurate translation of valid Singlish inputs:

- **Daily Language Usage** - Common phrases and everyday communication
- **Greeting/Request/Response** - Social interactions
- **Mixed Singlish + English** - Hybrid language with English terms (YouTube, meet, call)
- **Names/Places** - Proper nouns like city names (Galle)
- **Numbers** - Currency, time, dates, measurements
- **Formatting** - Line breaks and text structure
- **Phrase Patterns** - Repeated words and complex sentences

**Grammar Coverage:**
- Simple sentences
- Past/Present/Future tense
- Interrogative (questions)
- Imperative (commands)
- Negation
- Plural forms
- Compound and complex sentences
- Paragraphs with multiple sentences

**Quality Validation:**
- Accuracy validation (translation correctness)
- Formatting preservation (line breaks, structure)

#### 2. Negative Tests (10 cases)
Validate system robustness with invalid or edge-case inputs:

- Joined words without spaces
- Excess whitespace
- Heavy slang usage
- Special symbols and characters
- Mixed capitalization
- Emojis
- HTML tags
- Very long nonsense strings (600+ characters)
- Shortcut slang
- Empty input

#### 3. UI Tests (1 case)
Validate user interface behavior:

- Real-time translation updates while typing

## Test Case Structure

Each test case includes:

```typescript
{
  tcId: string;        // Unique test case ID (e.g., 'Pos_Fun_01')
  name: string;        // Descriptive test name
  input: string;       // Singlish input text
  expected?: string;   // Expected Sinhala output (for positive tests)
  category: string;    // Test category
  grammar: string;     // Grammar type being tested
  length: 'S'|'M'|'L'; // Input length (Short/Medium/Long)
  quality: string;     // Quality dimension being validated
}
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Playwright** test framework

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test categories
```bash
# Run only positive tests
npx playwright test -g "Pos_Fun"

# Run only negative tests
npx playwright test -g "Neg_Fun"

# Run only UI tests
npx playwright test -g "Pos_UI"
```

### Run a specific test
```bash
npx playwright test -g "Pos_Fun_01"
```

### Run with UI mode (interactive)
```bash
npx playwright test --ui
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Generate HTML report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

## Test Results & Reporting

The test suite provides detailed feedback for each test case:

### Positive Test Results
- **PASS**: Includes verification that output matches expected translation
- **FAIL**: Provides detailed comparison showing:
  - Input text
  - Expected translation
  - Actual translation
  - Failure type (Empty Output or Output Mismatch)

### Negative Test Results
- Validates graceful handling without crashes
- Reports input and output for analysis

### UI Test Results
- Confirms real-time translation functionality

## Key Features

1. **Normalized Text Comparison** - Uses `.normalize().trim()` for consistent string matching
2. **Timeout Handling** - 10-second timeout for translation completion
3. **Test Attachments** - Detailed pass/fail reasons attached to test results
4. **Sequential Input** - UI test types with realistic delays (200ms between keystrokes)
5. **Comprehensive Coverage** - Tests short phrases, medium sentences, and long paragraphs

## Example Test Cases

### Simple Translation
```typescript
Input:  'mata thee bonna oonee'
Expected: 'මට තේ බොන්න ඕනෑ'
Translation: "I want to drink tea"
```

### Mixed Language
```typescript
Input:  'mama adha busy eehinda api passe kathaa karamu'
Expected: 'මම අද busy ඒහින්ද අපි පස්සේ කතා කරමු'
Translation: "I'm busy today so let's talk later"
```

### Paragraph
```typescript
Input:  'api adha udhaasanama iskoolee yanavaa. passe api class ekata weda karanavaa...'
Expected: 'අපි අද උදෑසනම ඉස්කෝලේ යනවා. පස්සේ අපි class එකට වැඩ කරනවා...'
Translation: "We go to school this morning. Then we work in class..."
```

## Project Structure

```
.
├── tests/
│   └── swifttranslator.spec.ts  # Main test suite
├── playwright.config.ts          # Playwright configuration
├── package.json
└── README.md
```

## Configuration

The test suite uses the following selectors:

- **Input field**: `page.getByPlaceholder('Input Your Singlish Text Here.')`
- **Output field**: `page.locator('div.panel-title:has-text("Sinhala") + div')`

## Contributing

When adding new test cases:

1. Follow the existing test case structure
2. Assign appropriate `tcId` following the naming convention
3. Include all required fields (tcId, name, input, expected, category, grammar, length, quality)
4. Add descriptive test names
5. Ensure expected outputs are normalized Sinhala text

## Troubleshooting

### Common Issues

**Tests timing out:**
- Increase timeout in `expect(output).not.toBeEmpty({ timeout: 10000 })`
- Check network connectivity to swifttranslator.com

**Character encoding issues:**
- Ensure terminal supports UTF-8
- Verify Sinhala Unicode fonts are installed

**Selector not found:**
- Verify the website structure hasn't changed
- Update selectors in the test file if needed

## License

This project is created for educational purposes as part of IT3040 coursework.

## Contact

IT23173354
BSc (Hons) in Information Technology - Year 3
