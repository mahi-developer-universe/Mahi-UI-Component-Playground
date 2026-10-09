const fs = require('fs');
const path = require('path');

const resPath = path.join(__dirname, '..', 'resources-data.js');
let code = fs.readFileSync(resPath, 'utf8');

// Match any url field that doesn't start with http
code = code.replace(/"url":\s*"([^"]+)"/g, (match, urlVal) => {
  if (urlVal.startsWith('http://') || urlVal.startsWith('https://')) {
    return match;
  }
  // Try to find http
  const httpIdx = urlVal.indexOf('http');
  if (httpIdx !== -1) {
    const cleanUrl = urlVal.slice(httpIdx).trim();
    console.log(`Cleaned URL from "${urlVal}" to "${cleanUrl}"`);
    return `"url": "${cleanUrl}"`;
  }
  return match;
});

fs.writeFileSync(resPath, code, 'utf8');
console.log('Successfully sanitized resources-data.js URLs!');
