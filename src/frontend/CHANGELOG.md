# Changelog

## [0.0.8] - 2025-06-05
### Added
- **Case Transformation Dropdown:** Added dropdown menu for sentence case, lowercase, UPPERCASE, Capitalize Each Word, and tOGGLE cASE above the input area.
- **Apply Button:** "Apply" button applies the selected transformation to the input text; includes validation to ensure input is present.
- **Clear Option:** Dropdown now supports a clear (mini "x") icon to reset selection back to default placeholder ("Case Transformation").
- **Tooltips:** Added tooltips to all interactive controls for better accessibility and user guidance.

### Changed
- **Apply Button State:** Button is now disabled if no input text or no transformation is selected.
- **Clear Button Behavior:** "Clear" now resets the text input, result, and also resets the case transformation dropdown to its placeholder/default state.

### Fixed
- Ensured all input and transformation edge cases are handled smoothly, providing appropriate validation and error feedback to users.

## [0.0.7] - 2025-06-04
### Added
- **Footer now displays both version and full formatted date**: Date is extracted from `CHANGELOG.md` and automatically shown as “Month Day, Year” (e.g., “June 4, 2025”) in the frontend.
- Dynamic date formatting using `toLocaleString` for maximum locale clarity.
- Updated Vite build logic to inject both version and formatted date as global constants (`__APP_VERSION__`, `__APP_DATE__`).

### Changed
- Footer layout improved for clarity: shows version and last updated date with a divider.
- Centralized date logic to avoid redundancy and ensure accuracy from single changelog source.

### Fixed
- Prevented any mismatch between displayed app version/date and source of truth in `CHANGELOG.md`.

---

## [0.0.6] - 2025-06-04
### Added
- **File upload support**: Users can now upload `.txt` files in the frontend. The content is read and loaded into the input automatically, supporting both manual and file-based text input.
- Ant Design `<Upload />` integration, styled with upload icon and only allowing `.txt` files.
- Example validation and user feedback if non-`.txt` files are uploaded.

### Changed
- TypeScript code quality improved: typed the file upload handler parameter as `RcFile` to resolve TS7006 warning.
- FileReader event handling now safely asserts `e.target` to fix TS18047 ("possibly null") warning.

### Fixed
- No user-facing bugs reported; improved input safety and compatibility for repeated file uploads and refresh actions.

---

## [0.0.5] - 2025-06-04
### Added
- Dockerfile for Go backend, supporting multi-stage builds for small image size.
- `.dockerignore` file to prevent extra files (source, modules) from being included in the final Docker image.
- Netlify deployment instructions and fix for `dist/` publish directory.
- Production-ready workflow: `.env.production`, Railway backend, and Netlify frontend now supported.
- `sync-version.js` improvements to use `.cjs` for CommonJS compatibility (Node.js "type": "module" fix).

### Changed
- Refactored Vite and React index entrypoint to standard import pattern.
- API endpoint usage now always via env variable (`VITE_BACKEND_COUNT_ENDPOINT`) and proper fetch.
- Main Go backend logic cleaned up for production deployment (removed local debug, improved handler comments).
- Updated instructions for Netlify and Railway deployment.

### Fixed
- Fixed MIME type error by always serving from `dist/` (never from raw src/).
- Fixed 404 and routing errors on Netlify by building and publishing the correct folder.
- Ensured proper character/line counting for all edge cases (multiple empty lines, mixed spaces).
- Fixed CORS and POST/GET handler logic for Go backend API.
- Fixed version not updating due to ESModule/CommonJS conflict.

---

## [0.0.4] - 2025-06-03
### Added
- Automated version sync script: now updating `package.json`, both README.md files, and `backend/version.go` using the version in `CHANGELOG.md`.
- Improved Go backend logic for accurate character and line counting, especially with empty lines and newlines.
- Frontend constant generation: auto-generates a TypeScript version constant for use in UI.

### Changed
- Ant Design frontend: minor UI/UX tweaks for input, labels, and error handling.
- Updated documentation for versioning workflow.

### Fixed
- Fixed off-by-one errors in row and column counting (Go backend).
- Corrected frontend to reflect backend logic for all counting modes.
- Fixed rare case where version did not sync if backend or frontend README.md missing.

---

## [0.0.3] - 2025-06-02
### Added
- Go backend: added endpoint for `/api/count` with CORS enabled.
- Frontend: added reset button to the character/word count UI.
- Initial dynamic version update script, updating `package.json` and main README.md.

### Fixed
- Fixed bug where Go backend included newlines in character count.
- Fixed frontend handling of multi-line text input.

---

## [0.0.2] - 2025-06-01
### Changed
- Updated Ant Design to v5, React to v18.2 for best compatibility.
- Documentation improvements in README.md for local setup.

---

## [0.0.1] - 2025-05-30
### Added
- Initial Go backend for character/word/line counting.
- Vite + React + TypeScript + Ant Design frontend scaffolding.

---

## [0.0.0] - 2025-05-28
### Added
- Project scaffolded: initial file structure for mono-repo with `frontend/` and `backend/`.
- Added first draft of `CHANGELOG.md`.
- Initial basic documentation and setup instructions.