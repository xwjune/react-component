const { execSync } = require(`child_process`);

execSync('rimraf lib');
execSync('babel src --out-dir lib --copy-files');
execSync('sass lib/components --no-source-map');
