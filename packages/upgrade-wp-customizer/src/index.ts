import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { intro, outro, confirm, select } from '@clack/prompts';
import { execSync } from 'child_process';
import { parse } from '@babel/parser';
import { yellow, green, red } from 'picocolors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SRC = path.resolve(process.cwd());
const BACKUP_SUFFIX = `-backup-${Date.now()}`;
const BACKUP_DIR = `${DEFAULT_SRC}${BACKUP_SUFFIX}`;

// Regex for import path replacement
const COMMONS_REGEX = /from ['"](\.\.\/){4}front\/wordpress\/wp-react-blocks-plugin\/blocks\/commons(\/index)?['"]/g;
const ICONS_REGEX = /from ['"](\.\.\/){4}front\/wordpress\/wp-react-blocks-plugin\/blocks\/icons(\/index)?['"]/g;
const COMMONS_REPLACEMENT = "from '@devgateway/dvz-wp-commons'";

// Regex for default import from icons
const ICONS_DEFAULT_IMPORT_REGEX = /import\s+([\w]+)\s+from\s+['"](\.\.\/){4}front\/wordpress\/wp-react-blocks-plugin\/blocks\/icons(\/index)?['"];?/g;
// Regex for named import from icons
const ICONS_NAMED_IMPORT_REGEX = /import\s+\{([^}]+)\}\s+from\s+['"](\.\.\/){4}front\/wordpress\/wp-react-blocks-plugin\/blocks\/icons(\/index)?['"];?/g;

// Regex for BLOCKS_NS and BLOCKS_CATEGORY replacement
const BLOCKS_NS_REGEX = /process\.env\.BLOCKS_NS/g;
const BLOCKS_CATEGORY_REGEX = /process\.env\.BLOCKS_CATEGORY/g;
const BLOCKS_IMPORT_REGEX = /import\s*\{[^}]*BLOCKS_NS[^}]*\}\s*from\s*['"]@devgateway\/dvz-wp-commons['"];?/;
const BLOCKS_IMPORT_LINE = "import { BLOCKS_NS, BLOCKS_CATEGORY } from '@devgateway/dvz-wp-commons';\n";

const cancel = () => {
  if (fs.existsSync(BACKUP_DIR)) {
    // Remove current dir and restore backup
    fs.rmSync(DEFAULT_SRC, { recursive: true, force: true });
    fs.renameSync(BACKUP_DIR, DEFAULT_SRC);
    console.log(yellow('Upgrade cancelled. Project rolled back to original state.'));
  } else {
    console.log(yellow('Operation cancelled.'));
  }
  process.exit(0);
}

function ensureDirSync(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function ***REMOVED***(content: string) {
  // Only insert if not already present
  if (BLOCKS_IMPORT_REGEX.test(content)) return content;
  // Insert after the last import (or at the top if no imports)
  const importRegex = /^(import[^;]+;\s*)+/m;
  const match = content.match(importRegex);
  if (match) {
    return content.replace(importRegex, match[0] + BLOCKS_IMPORT_LINE);
  } else {
    return BLOCKS_IMPORT_LINE + content;
  }
}

function ***REMOVED***(content: string) {
  // Replace commons and icons import paths (non-default)
  let newContent = content.replace(COMMONS_REGEX, COMMONS_REPLACEMENT);

  // Replace named import from icons with named import from commons
  newContent = newContent.replace(ICONS_NAMED_IMPORT_REGEX, (match, symbols) => {
    return `import {${symbols}} from '@devgateway/dvz-wp-commons';`;
  });

  // Replace default import from icons with named import
  newContent = newContent.replace(ICONS_DEFAULT_IMPORT_REGEX, (match, symbol) => {
    return `import { ${symbol} } from '@devgateway/dvz-wp-commons';`;
  });

  // Replace any remaining icons import paths (non-default)
  newContent = newContent.replace(ICONS_REGEX, COMMONS_REPLACEMENT);

  let replaced = false;
  if (BLOCKS_NS_REGEX.test(newContent) || BLOCKS_CATEGORY_REGEX.test(newContent)) {
    replaced = true;
    newContent = newContent.replace(BLOCKS_NS_REGEX, 'BLOCKS_NS').replace(BLOCKS_CATEGORY_REGEX, 'BLOCKS_CATEGORY');
  }
  if (replaced) {
    newContent = ***REMOVED***(newContent);
  }
  return newContent;
}

function isValidAST(code: string, filePath: string): boolean {
  try {
    parse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript' 
      ],
    });
    return true;
  } catch (err: any) {
    console.error(red(`AST parse error in ${filePath}: ${err.message}`));
    return false;
  }
}

function mergeFile(srcFile: string, templateFile: string | null, destFile: string) {
  const ext = path.extname(templateFile || srcFile);
  let content = '';
  if (templateFile && fs.existsSync(templateFile)) {
    content = fs.readFileSync(templateFile, 'utf8');
  } else if (fs.existsSync(srcFile)) {
    content = fs.readFileSync(srcFile, 'utf8');
  }
  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
    const transformed = ***REMOVED***(content);
    if (isValidAST(transformed, destFile)) {
      fs.writeFileSync(destFile, transformed, 'utf8');
    } else {
      console.error(`Skipped writing invalid JS/TS file: ${destFile}`);
    }
  } else {
    fs.writeFileSync(destFile, content, 'utf8');
  }
}

function mergeDirs(srcDir: string, templateDir: string, destDir: string) {
  ensureDirSync(destDir);
  // Collect all unique file/directory names from both src and template
  const srcEntries = fs.existsSync(srcDir) ? fs.readdirSync(srcDir) : [];
  const ***REMOVED*** = fs.existsSync(templateDir) ? fs.readdirSync(templateDir) : [];
  const allEntries = Array.from(new Set([...srcEntries, ...***REMOVED***]));

  for (const entry of allEntries) {
    const srcPath = path.join(srcDir, entry);
    const templatePath = path.join(templateDir, entry);
    const destPath = path.join(destDir, entry);
    const srcExists = fs.existsSync(srcPath);
    const ***REMOVED*** = fs.existsSync(templatePath);
    const isDir = (srcExists && fs.statSync(srcPath).isDirectory()) || (***REMOVED*** && fs.statSync(templatePath).isDirectory());
    if (isDir) {
      mergeDirs(srcPath, templatePath, destPath);
    } else {
      mergeFile(srcPath, ***REMOVED*** ? templatePath : null, destPath);
    }
  }
}

function ***REMOVED***(filePath: string) {
  const ext = path.extname(filePath);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
    const transformed = ***REMOVED***(content);
    if (isValidAST(transformed, filePath)) {
      fs.writeFileSync(filePath, transformed, 'utf8');
    } else {
      console.error(`Skipped writing invalid JS/TS file: ${filePath}`);
    }
  }
}

function ***REMOVED***(dir: string) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.git') continue;
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      ***REMOVED***(fullPath);
    } else {
      ***REMOVED***(fullPath);
    }
  }
}

function ***REMOVED***(src: string, dest: string, ***REMOVED*** = false) {
  if (!fs.existsSync(src)) return;
  ensureDirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  // Check if this is the root of a blocks directory
  const isBlocksRoot = path.basename(dest) === 'blocks';
  for (const entry of entries) {
    // Skip node_modules, .git, and other system folders
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      ***REMOVED***(srcPath, destPath, isBlocksRoot);
    } else {
      // If at the root of blocks and file is index.js and index.jsx exists, skip copying index.js
      if (
        ***REMOVED*** &&
        entry.name === 'index.js' &&
        fs.existsSync(path.join(dest, 'index.jsx'))
      ) {
        continue;
      }
      // If at the root of blocks and file is index.js or index.jsx and already exists, skip (but only if not index.js with index.jsx present)
      if (
        ***REMOVED*** &&
        (entry.name === 'index.js' || entry.name === 'index.jsx') &&
        fs.existsSync(destPath)
      ) {
        // Only skip if not index.js with index.jsx present (handled above)
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function migrateBlocksIndexRequiresToImports(blocksDir: string) {
  for (const file of ['index.js', 'index.jsx']) {
    const filePath = path.join(blocksDir, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Replace require('./...') or require("./...") with import './...'
      content = content.replace(/require\((['"])(\.\/[^'"]+)\1\)/g, 'import $1$2$1');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

async function main() {
  // Parse --force from process.argv
  const force = process.argv.includes('--force');

  // Backup project before making changes
  if (fs.existsSync(DEFAULT_SRC)) {
    if (fs.existsSync(BACKUP_DIR)) {
      fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
    }
    ***REMOVED***(DEFAULT_SRC, BACKUP_DIR);
  }

  // Check if git directory is dirty
  let isDirty = false;
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    isDirty = gitStatus.trim().length > 0;
  } catch (e) {
    // If git is not available, ignore
  }

  if (isDirty && !force) {
    outro('Git directory has uncommitted changes. Use --force to proceed anyway.');
    // Restore backup if exists
    cancel();
    return;
  }

  intro('WP Customizer Migration Tool');

  const proceed = await confirm({
    message: `Proceed with migration? This will overwrite files in: ${DEFAULT_SRC}`,
    initialValue: true,
  });
  if (!proceed) {
    // Restore backup if exists
    cancel();
    return outro('Migration cancelled.');
  }

  // Copy template contents into the project being upgraded
  const templateDir = path.resolve(__dirname, '../template');
  ***REMOVED***(templateDir, DEFAULT_SRC);

  // Migrate blocks/index.js and blocks/index.jsx requires to imports
  const blocksDir = path.join(DEFAULT_SRC, 'blocks');
  migrateBlocksIndexRequiresToImports(blocksDir);

  ***REMOVED***(DEFAULT_SRC);
  outro(green(`Migration complete. Files updated in: ${DEFAULT_SRC}`));

  // Remove backup after successful migration
  if (fs.existsSync(BACKUP_DIR)) {
    fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
  }

  // Prompt user to select package manager
  const pkgManager = await select({
    message: 'Select your package manager to install dependencies:',
    options: [
      { value: 'npm', label: 'npm' },
      { value: 'yarn', label: 'yarn' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'skip', label: 'Skip installation' }
    ],
    initialValue: 'npm',
  });

  if (pkgManager && String(pkgManager) !== 'skip') {
    const blocksDir = path.join(DEFAULT_SRC, 'blocks');
    outro(`Installing dependencies and @devgateway/dvz-wp-commons using ${String(pkgManager)} in ${blocksDir}...`);
    let installCmd = '';
    if (String(pkgManager) === 'npm') {
      installCmd = 'npm install && npm install @devgateway/dvz-wp-commons';
    } else if (String(pkgManager) === 'yarn') {
      installCmd = 'yarn install && yarn add @devgateway/dvz-wp-commons';
    } else if (String(pkgManager) === 'pnpm') {
      installCmd = 'pnpm install && pnpm add @devgateway/dvz-wp-commons';
    }
    try {
      execSync(installCmd, { stdio: 'inherit', cwd: blocksDir });
      outro(green('Dependencies installed successfully in blocks directory.'));
    } catch (e) {
      outro(red('Failed to install dependencies in blocks directory. Please run the install command manually inside the blocks directory.'));
    }
  } else {
    outro('Skipped dependency installation. Please install dependencies and @devgateway/dvz-wp-commons manually in the blocks directory.');
  }
}

main(); 