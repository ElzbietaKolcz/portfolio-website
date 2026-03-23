---
name: no_polish_chars_in_edits
description: Do not add Polish diacritical characters (ż, ł, ę, etc.) when editing files — user prefers ASCII-safe text
type: feedback
---

Do not introduce Polish diacritical characters (ą, ę, ó, ś, ź, ż, ł, ń, ć) into file content when editing.

**Why:** User explicitly rejected an edit that changed "Elzbieta Kolcz" to "Elżbieta Kołcz".

**How to apply:** When editing any file (HTML, JSX, JSON, CSS, etc.), preserve the existing ASCII spelling of names and text. Do not "fix" missing diacritics unless the user explicitly asks for it.
