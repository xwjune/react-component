const bash = require('./bash');

bash('rimraf dist');
// webpack编译
bash(`webpack --config ${require.resolve('../webpack.config.js')} --progress`);
