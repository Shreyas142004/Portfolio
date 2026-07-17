const fs = require('fs');
const file = 'd:/Projects/New-Portfolio/src/components/Projects.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/className=\{clsx\(([^)]+)\)\}/g, (match, args) => {
  const clean = args.split(',').map(s => s.trim().replace(/['"]/g, '')).join(' ');
  return `className="${clean}"`;
});

fs.writeFileSync(file, content);
console.log('Fixed');
