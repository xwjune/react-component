const { execSync } = require(`child_process`);

execSync('rimraf lib');
execSync('cross-env SASS_ENV=true babel src --out-dir lib --copy-files');
execSync('sass lib/components --no-source-map');
