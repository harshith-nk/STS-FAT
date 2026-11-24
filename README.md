# STS Prep Lab
245 explained MCQs across 33 topics. Static HTML/CSS/JavaScript; no build tools or server required.

## Put it on GitHub Pages
1. Create a **public** GitHub repository named **sts-fat-practice**.
2. Extract STS-Prep-Lab-GitHub.zip.
3. Upload the extracted files (not the ZIP) to the repository root. index.html must be at the top level.
4. Commit the files.
5. Open **Settings → Pages → Build and deployment**.
6. Select **Deploy from a branch**, choose **main** and **/(root)**, then Save.
7. Wait for the Pages deployment to finish. Copy the website URL shown in Settings → Pages.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

No npm install, database, API key or login is needed. All asset references are relative, so repository subpaths work.

## Features
- Topic/style/difficulty filters, code-output sprint and per-option explanations
- Balanced 25/50/100-question timed mock papers; configurable 30/60/90/120 minutes
- Question navigator, flags, bookmarks, saved/resumable sessions
- Automatic submission when an expired mock is next active in the browser
- Mistake notebook, retries, topic coverage and session history
- Revision cards, flashcards, printable notes, light/dark themes
- Progress export/import; each friend has separate device-local data

## Content and limitations
Questions are original practice, not official past-paper questions. Numeric drill variants are labelled.
The two supplied DOCX materials ground the topic coverage. Booth PPT text was image-heavy and its slide details could not be fully extracted; Booth content uses the DOCX and standard register rules.
Java foundation questions supplement the supplied materials.
The revision desk explicitly flags inconsistencies in source code, notably strobogrammatic centers, majority input/threshold, hourglass accumulation, natural-sort digit loops, Booth sign extension, Manacher radius, path-versus-cycle and the Alice apple formula.
A 90+ target is motivational, not a predicted or guaranteed exam score. Actual exam timing/marking was not supplied.
Core app works without external libraries; optional Google Fonts fall back to system fonts if unavailable.
Storage may be unavailable in private browsing. Export a backup before changing browser/device.

## Editing
- bank.js: topic notes and question bank. Preserve IDs/order when possible to retain progress mapping.
- app.js: UI, sessions, timer and progress.
- style.css: responsive styles.
- index.html: entry point.

## Verification
Bank checks: four distinct options, one correct choice, explanations for all options.
Logic checks: routes, locking practice answers, retry clearing mistakes, bookmarks, balanced sampling, deferred mock scoring, expiry and backup validation.
Local browser preview was blocked by the environment network route; visual browser QA was not completed before packaging.

