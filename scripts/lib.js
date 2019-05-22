const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// 样式文件查找，生成CSS Modules文件【style.module.css】
const buildCssModules = (paths) => {
  if (!fs.existsSync(paths)) {
    return;
  }
  const stat = fs.statSync(paths);
  if (stat.isDirectory()) {
    const children = fs.readdirSync(paths);
    children.forEach((child) => {
      buildCssModules(path.join(paths, child));
    });
  } else if (stat.isFile()) {
    if (/style.scss$/.test(paths)) {
      const data = ':global {\n\t@import "./style";\n}';
      fs.writeFileSync(path.join(path.dirname(paths), 'style.module.scss'), data, 'utf8');
    }
  }
};

execSync('rimraf lib');
execSync('babel src -D -d lib --ignore src/**/__tests__');
buildCssModules(path.resolve('./lib/components'));
execSync('sass lib/components --no-source-map');
