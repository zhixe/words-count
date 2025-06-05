const { execSync } = require('child_process');
const fs = require('fs');

// Utility for colored logs
const green = (txt) => `\x1b[32m${txt}\x1b[0m`;
const yellow = (txt) => `\x1b[33m${txt}\x1b[0m`;
const red = (txt) => `\x1b[31m${txt}\x1b[0m`;
const cyan = (txt) => `\x1b[36m${txt}\x1b[0m`;

console.log(cyan("Reading latest version from CHANGELOG.md..."));

const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
const match = changelog.match(/^##\s*\[?([0-9]+\.[0-9]+\.[0-9]+)\]?\s*-/m);

if (!match) {
    console.error(red('❌ Version not found in CHANGELOG.md'));
    process.exit(1);
}

const version = match[1];
const tagName = `v${version}`;
console.log(green(`✔ Latest version found: ${version}`));
console.log(`Checking if git tag ${yellow(tagName)} exists...`);

try {
    execSync(`git rev-parse ${tagName}`, { stdio: 'ignore' });
    console.log(yellow(`⚠ Tag ${tagName} already exists. No new tag created.`));
} catch {
    console.log(green(`Creating git tag ${tagName}...`));
    execSync(`git tag ${tagName}`);
    console.log(green(`Pushing tag ${tagName} to remote...`));
    execSync(`git push origin ${tagName}`);
    console.log(green(`✅ Tagged and pushed ${tagName} successfully!`));
}