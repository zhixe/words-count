# Changelog

## [0.0.4] - 2024-06-03
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

## [0.0.3] - 2024-06-02
### Added
- Go backend: added endpoint for `/api/count` with CORS enabled.
- Frontend: added reset button to the character/word count UI.
- Initial dynamic version update script, updating `package.json` and main README.md.

### Fixed
- Fixed bug where Go backend included newlines in character count.
- Fixed frontend handling of multi-line text input.

---

## [0.0.2] - 2024-06-01
### Changed
- Updated Ant Design to v5, React to v18.2 for best compatibility.
- Documentation improvements in README.md for local setup.

---

## [0.0.1] - 2024-05-30
### Added
- Initial Go backend for character/word/line counting.
- Vite + React + TypeScript + Ant Design frontend scaffolding.

---

## [0.0.0] - 2024-05-28
### Added
- Project scaffolded: initial file structure for mono-repo with `frontend/` and `backend/`.
- Added first draft of `CHANGELOG.md`.
- Initial basic documentation and setup instructions.