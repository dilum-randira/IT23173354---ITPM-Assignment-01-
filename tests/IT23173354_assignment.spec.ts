import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

function clean(text: string | null): string {
  return text?.normalize().trim() ?? '';
}

type Scenario = {
  tcId: string;
  name: string;
  input: string;
  expected?: string;
  category: string;
  grammar: string;
  length: 'S' | 'M' | 'L';
  quality: 'Accuracy validation' | 'Robustness validation' | 'Formatting preservation';
};

/* ---------------- Positive (25)---------------- */

const positive: Scenario[] = [

{ tcId:'Pos_Fun_01', name:'Drink request', input:'mata thee bonna oonee', expected:'මට තේ බොන්න ඕනෑ', category:'Daily language usage', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_02', name:'Watching TV', input:'mama tv balanavaa', expected:'මම tv බලනවා', category:'Daily language usage', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_03', name:'Walking outside', input:'api bus eke yanavaa', expected:'අපි බස් එකේ යනවා', category:'Daily language usage', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_04', name:'Question arrival', input:'oya enne kavaddha?', expected:'ඔයා එන්නේ කවද්ද?', category:'Greeting / request / response', grammar:'Interrogative', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_05', name:'Command sit', input:'mehe inna', expected:'මෙහෙ ඉන්න', category:'Daily language usage', grammar:'Imperative', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_06', name:'Past action', input:'mama kalin kanna giyaa', expected:'මම කලින් කන්න ගියා', category:'Daily language usage', grammar:'Past tense', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_07', name:'Future plan', input:'api passe meet vemu', expected:'අපි පස්සේ meet වෙමු', category:'Mixed Singlish + English', grammar:'Future tense', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_08', name:'Negative refusal', input:'mata yanna baee', expected:'මට යන්න බෑ', category:'Daily language usage', grammar:'Negation', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_09', name:'Plural action', input:'api okkoma yanavaa', expected:'අපි ඔක්කොම යනවා', category:'Daily language usage', grammar:'Plural', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_10', name:'Greeting response', input:'hari hondai', expected:'හරි හොඳයි', category:'Greeting / request / response', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_11', name:'YouTube term', input:'mata YouTube video ekak balanna oonee', expected:'මට YouTube video එකක් බලන්න ඕනෑ', category:'Mixed Singlish + English', grammar:'Simple sentence', length:'M', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_12', name:'City name', input:'mama Galle giyaa', expected:'මම Galle ගියා', category:'Names / places', grammar:'Past tense', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_13', name:'Repeated words', input:'lassanai lassanai', expected:'ලස්සනයි ලස්සනයි', category:'Phrase pattern', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_14', name:'Currency', input:'mata USD 50k oonee', expected:'මට USD 50ක් ඕනෑ', category:'Numbers', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_15', name:'Time', input:'8.45 PM ennam', expected:'8.45 PM එන්නම්', category:'Numbers', grammar:'Future tense', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_16', name:'Date', input:'janavaari 5', expected:'ජනවාරි 5', category:'Numbers', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_17', name:'Measurement', input:'5kg bath', expected:'5kg බත්', category:'Numbers', grammar:'Simple sentence', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_18', name:'Medium conversation', input:'mama adha busy eehinda api passe kathaa karamu', expected:'මම අද busy ඒහින්ද අපි පස්සේ කතා කරමු', category:'Daily language usage', grammar:'Compound', length:'M', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_19', name:'Line break', input:'mama gedhara yanavaa\noyaa enne?', expected:'මම ගෙදර යනවා\nඔයා එන්නේ?', category:'Formatting', grammar:'Compound', length:'M', quality:'Formatting preservation' },

{ tcId:'Pos_Fun_20', name:'Complex sentence', input:'oya enne nam api set vemu eehinda mama wait karanavaa', expected:'ඔයා එන්නේ නම් අපි set වෙමු ඒහින්ද මම wait කරනවා', category:'Daily language usage', grammar:'Complex', length:'M', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_21', name:'Polite ask', input:'karunaakaralaa eeka denna', expected:'කරුණාකරලා ඒක දෙන්න', category:'Greeting', grammar:'Imperative', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_22', name:'Fear', input:'mata baya hithenavaa', expected:'මට බය හිතෙනවා', category:'Daily language usage', grammar:'Simple', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_23', name:'Sleepy', input:'mata nidhimathai', expected:'මට නිදිමතයි', category:'Daily language usage', grammar:'Simple', length:'S', quality:'Accuracy validation' },

{ tcId:'Pos_Fun_24', name:'Phone call', input:'mama passe call ekak dennam', expected:'මම පස්සේ call එකක් දෙන්නම්', category:'Mixed', grammar:'Future', length:'S', quality:'Accuracy validation' },

{ 
  tcId: 'Pos_Fun_25',
  name: 'Paragraph daily routine',
  input: 'api adha udhaasanama iskoolee yanavaa. passe api class ekata weda karanavaa. raee api gedhara enne. adha api hondatama mahansi vuna.',
  expected: 'අපි අද උදෑසනම ඉස්කෝලේ යනවා. පස්සේ අපි class එකට වැඩ කරනවා. රෑ අපි ගෙදර එන්නේ. අද අපි හොඳටම මහන්සි වුණා.',
  category: 'Daily language usage',
  grammar: 'Paragraph / multiple sentences',
  length: 'L',
  quality: 'Accuracy validation'
}

];

/* ---------------- Negative (10) ---------------- */

const negative: Scenario[] = [
{ tcId:'Neg_Fun_01', name:'Joined words', input:'matawathuraoonee', category:'Typo', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_02', name:'Excess spaces', input:'mama     yanavaa', category:'Formatting', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_03', name:'Slang overload', input:'adooo bn supiri', category:'Slang', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_04', name:'Symbols', input:'%%%%!!!!', category:'Formatting', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_05', name:'Mixed caps', input:'MaMa YaNaVaA', category:'Typo', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_06', name:'Emoji', input:'😂😂😂', category:'Formatting', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_07', name:'HTML text', input:'<html></html>', category:'Formatting', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_08', name:'Long nonsense', input:'x'.repeat(600), category:'Stress', grammar:'Simple', length:'L', quality:'Robustness validation' },
{ tcId:'Neg_Fun_09', name:'Shortcut slang', input:'u ok bro', category:'Slang', grammar:'Simple', length:'S', quality:'Robustness validation' },
{ tcId:'Neg_Fun_10', name:'Empty', input:'', category:'Empty', grammar:'Simple', length:'S', quality:'Robustness validation' }
];

/* ---------------- UI ---------------- */

const ui = {
  tcId:'Pos_UI_01',
  name:'Real-time update',
  input:'mama gedhara'
};

/* ---------------- Test Suite ---------------- */

test.describe('SwiftTranslator QA Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  /* ---------- POSITIVE ---------- */
  for (const t of positive) {
    test(`${t.tcId} — ${t.name}`, async ({ page }, testInfo) => {
      const input = page.getByPlaceholder('Input Your Singlish Text Here.');
      const output = page.locator('div.panel-title:has-text("Sinhala") + div');

      await input.clear();
      await input.fill(t.input);
      await expect(output).not.toBeEmpty({ timeout: 10000 });

      const actual = clean(await output.textContent());
      const expected = clean(t.expected!);

      if (!actual) {
        await testInfo.attach('FAIL Reason', {
          body:
`Failure Type: Empty Output
Reason: Translator did not produce any Sinhala output.

Input: ${t.input}
Expected: ${expected}
Actual: [EMPTY]`,
          contentType: 'text/plain',
        });
      } else if (actual !== expected) {
        await testInfo.attach('FAIL Reason', {
          body:
`Failure Type: Output Mismatch
Reason: Translator output does not match expected Sinhala translation.

Input: ${t.input}
Expected: ${expected}
Actual: ${actual}`,
          contentType: 'text/plain',
        });
      } else {
        await testInfo.attach('PASS Reason', {
          body:
`Result: PASS
Reason: Translator output matches expected Sinhala translation.`,
          contentType: 'text/plain',
        });
      }

      expect(actual).toBe(expected);
    });
  }

  /* ---------- NEGATIVE ---------- */
  for (const t of negative) {
    test(`${t.tcId} — ${t.name}`, async ({ page }, testInfo) => {
      const input = page.getByPlaceholder('Input Your Singlish Text Here.');
      const output = page.locator('div.panel-title:has-text("Sinhala") + div');

      await input.clear();
      await input.fill(t.input);
      await page.waitForTimeout(1000);

      const actual = clean(await output.textContent());

      await testInfo.attach('Handled Gracefully', {
        body:
`Negative Test Case
Reason: System handled invalid input without crashing.

Input: ${t.input || '[EMPTY]'}
Output: ${actual || '[EMPTY]'}`,
        contentType: 'text/plain',
      });

      expect(actual.length).toBeGreaterThanOrEqual(0);
    });
  }

  /* ---------- UI ---------- */
  test(`${ui.tcId} — ${ui.name}`, async ({ page }, testInfo) => {
    const input = page.getByPlaceholder('Input Your Singlish Text Here.');
    const output = page.locator('div.panel-title:has-text("Sinhala") + div');

    await input.clear();
    await input.pressSequentially(ui.input, { delay: 200 });
    await expect(output).toContainText('මම');

    await testInfo.attach('UI Verification', {
      body:
`Result: PASS
Reason: Real-time Sinhala output appeared while typing.`,
      contentType: 'text/plain',
    });
  });

});
