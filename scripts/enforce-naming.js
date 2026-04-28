#!/usr/bin/env node

/**
 * Script to enforce Angular naming conventions
 * Run after generating components to rename files to follow conventions
 */

const fs = require('fs');
const path = require('path');

function renameAngularFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.error(`Directory not found: ${directory}`);
    process.exit(1);
  }

  const files = fs.readdirSync(directory);
  const baseName = path.basename(directory);
  let renamed = false;

  // Check for component files without .component suffix
  const tsFile = files.find(f => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.includes('.component.'));
  const htmlFile = files.find(f => f.endsWith('.html') && !f.includes('.component.'));
  const scssFile = files.find(f => f.endsWith('.scss') && !f.includes('.component.'));
  const specFile = files.find(f => f.endsWith('.spec.ts') && !f.includes('.component.'));

  if (tsFile) {
    const newName = tsFile.replace('.ts', '.component.ts');
    const oldPath = path.join(directory, tsFile);
    const newPath = path.join(directory, newName);
    
    // Update class name and file references
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Fix class name (e.g., TestApp -> TestAppComponent)
    const classMatch = content.match(/export class (\w+)/);
    if (classMatch && !classMatch[1].endsWith('Component')) {
      const oldClassName = classMatch[1];
      const newClassName = oldClassName + 'Component';
      content = content.replace(new RegExp(`\\b${oldClassName}\\b`, 'g'), newClassName);
    }
    
    // Fix template and style URLs
    if (htmlFile) {
      content = content.replace(
        `templateUrl: './${htmlFile}'`,
        `templateUrl: './${htmlFile.replace('.html', '.component.html')}'`
      );
    }
    if (scssFile) {
      content = content.replace(
        `styleUrl: './${scssFile}'`,
        `styleUrl: './${scssFile.replace('.scss', '.component.scss')}'`
      );
    }
    
    fs.writeFileSync(oldPath, content);
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${tsFile} → ${newName}`);
    renamed = true;
  }

  if (htmlFile) {
    const newName = htmlFile.replace('.html', '.component.html');
    fs.renameSync(path.join(directory, htmlFile), path.join(directory, newName));
    console.log(`✓ Renamed: ${htmlFile} → ${newName}`);
    renamed = true;
  }

  if (scssFile) {
    const newName = scssFile.replace('.scss', '.component.scss');
    fs.renameSync(path.join(directory, scssFile), path.join(directory, newName));
    console.log(`✓ Renamed: ${scssFile} → ${newName}`);
    renamed = true;
  }

  if (specFile && !specFile.includes('.component.')) {
    const newName = specFile.replace('.spec.ts', '.component.spec.ts');
    const oldPath = path.join(directory, specFile);
    const newPath = path.join(directory, newName);
    
    // Update imports in spec file
    let content = fs.readFileSync(oldPath, 'utf8');
    if (tsFile) {
      const oldImport = `./${tsFile.replace('.ts', '')}`;
      const newImport = `./${tsFile.replace('.ts', '.component')}`;
      content = content.replace(oldImport, newImport);
      
      // Fix class name references
      const classMatch = content.match(/import \{ (\w+) \}/);
      if (classMatch && !classMatch[1].endsWith('Component')) {
        const oldClassName = classMatch[1];
        const newClassName = oldClassName + 'Component';
        content = content.replace(new RegExp(`\\b${oldClassName}\\b`, 'g'), newClassName);
      }
    }
    
    fs.writeFileSync(oldPath, content);
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${specFile} → ${newName}`);
    renamed = true;
  }

  if (!renamed) {
    console.log('✓ Files already follow naming conventions');
  }
}

// Get directory from command line arguments
const directory = process.argv[2];

if (!directory) {
  console.error('Usage: node enforce-naming.js <component-directory>');
  console.error('Example: node scripts/enforce-naming.js src/app/components/my-component');
  process.exit(1);
}

renameAngularFiles(directory);
