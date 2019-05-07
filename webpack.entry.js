const path = require('path');
const fs = require('fs');

const entries = [];
const getEntry = (paths) => {
  if (!fs.existsSync(paths)) {
    return;
  }
  const stat = fs.statSync(paths);
  if (stat.isDirectory()) {
    const children = fs.readdirSync(paths);
    children.forEach((child) => {
      getEntry(path.join(paths, child));
    });
  } else if (stat.isFile()) {
    if (/style.scss$/.test(paths)) {
      entries.push(paths);
    }
  }
};
getEntry(path.resolve('./src/components'));

const logs = [
  '> Style Map:',
  ...entries,
  '',
];
console.log(logs.join('\n'));

module.exports = entries;
