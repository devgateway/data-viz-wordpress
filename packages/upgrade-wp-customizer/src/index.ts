import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { intro, outro, confirm } from '@clack/prompts';
import { execSync } from 'child_process';
import { parse } from '@babel/parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SRC = path.resolve(process.cwd(), 'current-wp-customizer');

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
        'typescript',
        // add more plugins if your codebase uses them
      ],
    });
    return true;
  } catch (err: any) {
    console.error(`AST parse error in ${filePath}:`, err.message);
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
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      ***REMOVED***(fullPath);
    } else {
      ***REMOVED***(fullPath);
    }
  }
}

async function main() {
  // Parse --force from process.argv
  const force = process.argv.includes('--force');

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
    return;
  }

  intro('WP Customizer Migration Tool');

  const proceed = await confirm({
    message: `Proceed with migration? This will overwrite files in: ${DEFAULT_SRC}`,
    initialValue: true,
  });
  if (!proceed) return outro('Migration cancelled.');

  ***REMOVED***(DEFAULT_SRC);
  outro(`Migration complete. Files updated in: ${DEFAULT_SRC}`);
}

main(); 