# Arabic Transliterator

A tool that phonetically transliterates English text into Arabic characters. Not a translation — it maps English sounds to their closest Arabic equivalents.

## Architecture

Two files, kept separate so the core logic can move to a browser extension unchanged:

- `transliterate.js` — pure function, no I/O. Takes a string, returns a string. This is the only file that evolves through development.
- `cli.js` — thin file I/O wrapper. Reads input file, calls `transliterate`, writes output file.

Uses ESM (`import`/`export`) throughout for browser extension compatibility.

## Pipeline (inside `transliterate.js`)

1. Split text into words
2. Look up each word in CMU Pronouncing Dictionary → ARPABET phonemes
3. Map ARPABET phonemes → Arabic characters (hardcoded table)
4. Fall back to original word if not found in dictionary

## Development Steps

1. ✅ Pass-through: read file, write unchanged
2. ✅ Tokenize into words, rejoin unchanged
3. ✅ *(Throwaway script)* Explore CMUdict package output
4. Look up every word in CMUdict, fall back to original
5. *(Throwaway script)* Explore ARPABET→Arabic mapping
6. Add full ARPABET→Arabic mapping — complete CLI app

## Invoke

```bash
node cli.js input.txt output.txt
```

## ARPABET → Arabic Character Map

Based on an Israeli Arabic system (not Persian). Arabic is right-to-left.

| ARPABET | Arabic | Notes |
|---------|--------|-------|
| P | پ (U+067E) | ب with three dots below |
| V | ڤ (U+06A4) | ف with three dots below |
| G | چ (U+0686) | ج with three dots below |
| CH | تش | two characters: ت then ش (logical order, displays right-to-left) |

Standard Arabic letters cover remaining sounds. Table to be expanded in step 5 (throwaway script).

## Code Style

- Prefer intermediate variables over complex nested expressions — break multi-step operations into named steps.

## Key Decisions

- **CMUdict** over a live API: offline, no rate limits, ~134k words, bundleable
- **ESM** over CommonJS: browser extensions support it natively
- **ARPABET → Arabic directly**: skips IPA conversion step — ARPABET codes are unambiguous and map cleanly to Arabic without an intermediate
- **Modular from step 1**: `transliterate.js` has no I/O so it ports directly to a browser content script
