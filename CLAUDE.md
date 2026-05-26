# Arabic Transliterator

A tool that phonetically transliterates English web pages into Arabic characters. Not a translation — it maps English sounds to their closest Arabic equivalents.

## Architecture

- `transliterate.js` — pure function, no I/O. Takes a string, returns a string.
- `cli.js` — thin file I/O wrapper. Reads input file, calls `transliterate`, writes output file.
- `content-script.js` — browser extension entry point. Walks DOM text nodes and applies `transliterate` in place.
- `background.js` — extension service worker. Handles toolbar button clicks, toggles transliteration on/off.
- `arpabet-to-arabic-mapping.js` — hardcoded ARPABET → Arabic character table.
- `english-to-arabic-fallback.js` — letter-by-letter fallback for words not in CMUdict. Handles common digraphs (ph, sh, ch, th, ng, etc.) before single letters.
- `generate-icons.js` — generates `icons/` PNGs from SVG using sharp. Run once when icons change.

Uses ESM (`import`/`export`) throughout for browser extension compatibility.

## Build

```bash
npm run build   # bundles content-script.js → bundle.js (4.5mb, gitignored)
node cli.js input.txt output.txt   # test the CLI
```

## Pipeline (inside `transliterate.js`)

1. Split text into words using regex, preserving punctuation
2. Convert punctuation to Arabic equivalents (، ؟ ؛ ۔)
3. Look up each word in CMU Pronouncing Dictionary → ARPABET phonemes
4. Map ARPABET phonemes → Arabic characters
5. Fall back to letter-by-letter English→Arabic if word not in dictionary

## Browser Extension

- Click the toolbar button (ع icon) to transliterate the current page
- Click again to reload and restore the original page
- `manifest.json` declares permissions and loads `bundle.js` as a content script
- `background.js` tracks which tabs have been transliterated

## ARPABET → Arabic Character Map

Based on an Israeli Arabic system (not Persian). Arabic is right-to-left.

| ARPABET | Arabic | Notes |
|---------|--------|-------|
| P | پ (U+067E) | ب with three dots below |
| V | ڤ (U+06A4) | ف with three dots below |
| G | چ (U+0686) | ج with three dots below |
| CH | تش | two characters: ت then ش (logical order, displays right-to-left) |
| NG | نچ | n + hard g |
| ZH | ژ (U+0698) | Persian letter for /ʒ/ sound (measure, vision) |

Standard Arabic letters cover remaining sounds.

## Code Style

- Prefer intermediate variables over complex nested expressions — break multi-step operations into named steps.

## Key Decisions

- **CMUdict** over a live API: offline, no rate limits, ~134k words, bundleable
- **ESM** over CommonJS: browser extensions support it natively
- **ARPABET → Arabic directly**: skips IPA conversion step — ARPABET codes are unambiguous and map cleanly to Arabic without an intermediate
- **Letter-by-letter fallback**: keeps output fully Arabic to avoid mixed RTL/LTR rendering issues
- **Toggle button**: transliterates on click, reloads on second click to restore original page
