#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { argv } from 'process';

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  reset: '\x1b[0m'
};

// Convert any case to PascalCase for component name
function toPascalCase(str) {
  return str
    .replace(/(^|[-_\s]+)([a-z0-9])/g, (_, __, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

// Simple argument parser
function parseArgs() {
  const args = argv.slice(2);
  const result = {
    _: [],
    ts: false,
    js: false,
    css: false,
    scss: false,
    moduleCss: false,
    moduleScss: false,
    scopedStyle: false
  };

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const option = arg.slice(2).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (option in result) {
        result[option] = true;
      }
    } else if (!arg.startsWith('-')) {
      result._.push(arg);
    }
  }

  return result;
}

const options = parseArgs();
const rawComponentName = options._[0];
const folderName = rawComponentName; // Keep original folder name
const componentName = toPascalCase(rawComponentName); // PascalCase for component

// Validate component name
if (!rawComponentName || !/^[a-zA-Z0-9\-_]+$/.test(rawComponentName)) {
  console.error(colors.red + 'Please provide a valid component name (alphanumeric with dashes/underscores)' + colors.reset);
  process.exit(1);
}

// Determine file extensions and styles
const componentExt = options.ts ? 'tsx' : 'jsx';
let styleExt = determineStyleExtension(options);
const useScopedStyle = options.scopedStyle;

// Determine base filename (PascalCase component name when scoped, otherwise 'index')
const baseFileName = useScopedStyle ? componentName : 'index';

// Check for conflicting style options
if (countStyleOptions(options) > 1) {
  console.error(colors.red + 'Error: You can only specify one style option (--css, --scss, --module-css, or --module-scss)' + colors.reset);
  process.exit(1);
}

// If no style option is provided, default to CSS
if (countStyleOptions(options) === 0) {
  options.css = true;
  styleExt = 'css';
}

const componentDir = path.join(process.cwd(), folderName);

// Check if directory already exists
if (fs.existsSync(componentDir)) {
  console.error(colors.red + `Error: Directory "${folderName}" already exists` + colors.reset);
  process.exit(1);
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

// Generate component content
const componentContent = generateComponentContent(componentName, baseFileName, componentExt, styleExt, options);

// Generate style content
const styleContent = generateStyleContent(componentName, styleExt);

// Write files
try {
  // Component file
  fs.writeFileSync(
    path.join(componentDir, `${baseFileName}.${componentExt}`),
    componentContent
  );

  // Style file (if any style option is selected)
  if (styleExt) {
    const styleFileName = useScopedStyle ? 
      `${componentName}.${styleExt}` : 
      `index.${styleExt}`;
    
    fs.writeFileSync(
      path.join(componentDir, styleFileName),
      styleContent
    );
  }

  console.log(colors.green + `Successfully created component in folder "${folderName}" with:` + colors.reset);
  console.log(colors.green + `- ${baseFileName}.${componentExt}` + colors.reset);
  if (styleExt) console.log(colors.green + `- ${useScopedStyle ? componentName : 'index'}.${styleExt}` + colors.reset);
} catch (err) {
  console.error(colors.red + `Error creating files: ${err.message}` + colors.reset);
  // Clean up directory if there was an error
  fs.rmSync(componentDir, { recursive: true, force: true });
  process.exit(1);
}

function determineStyleExtension(options) {
  if (options.css) return 'css';
  if (options.scss) return 'scss';
  if (options.moduleCss) return 'module.css';
  if (options.moduleScss) return 'module.scss';
  return null;
}

function countStyleOptions(options) {
  return ['css', 'scss', 'moduleCss', 'moduleScss'].filter(opt => options[opt]).length;
}

function generateComponentContent(componentName, baseFileName, componentExt, styleExt, options) {
  const isTypeScript = componentExt === 'tsx';
  const styleFile = useScopedStyle ? `${componentName}.${styleExt}` : `index.${styleExt}`;
  const styleImport = styleExt ? `import './${styleFile}';\n` : '';
  
  if (isTypeScript) {
    return `import React from 'react';
${styleImport}
interface ${componentName}Props {
  // Add your props here
}

const ${componentName}: React.FC<${componentName}Props> = ({}) => {
  return (
    <div className="${useScopedStyle ? componentName.toLowerCase() : 'container'}">
      {/* Your component content */}
    </div>
  );
};

export default ${componentName};
`;
  } else {
    return `import React from 'react';
${styleImport}
const ${componentName} = (props) => {
  return (
    <div className="${useScopedStyle ? componentName.toLowerCase() : 'container'}">
      {/* Your component content */}
    </div>
  );
};

export default ${componentName};
`;
  }
}

function generateStyleContent(componentName, styleExt) {
  if (!styleExt) return '';
  
  const isModule = styleExt.includes('module.');
  const className = isModule ? 
    `.${componentName.toLowerCase()}` : 
    `.container`;

  if (styleExt.includes('scss')) {
    return `${className} {
  // Your SCSS styles here
}
`;
  } else {
    return `${className} {
  /* Your CSS styles here */
}
`;
  }
}