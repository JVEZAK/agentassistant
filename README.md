# Agent Assistant (v1.0)

Helps small businesses find and set up AI assistants (missed-call text-back, website chat, review requests, quote drafting, payment reminders).

- `src/data.js`: assistants, pain points and industries. Bump `VERSION` and `DATA_DATE` on every change.
- `src/style.css`: styles.
- `build.js`: renders `dist/` (home with finder, /agents/, /for/<industry>/, /thanks/, sitemap, robots, llms.txt).
- The audit form uses Netlify Forms (`data-netlify="true"`); submissions appear in the Netlify project under Forms.

Build: `SITE=https://getagentassistant.com node build.js`
