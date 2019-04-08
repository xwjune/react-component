/**
 * babel插件，将引入的scss文件路径转化为css文件路径。
 *
 * import './index.scss';
 * // => require("./index.css");
 */
module.exports = () => {
  return {
    visitor: {
      // import 语句解析时触发该函数
      ImportDeclaration(path) {
        const { node } = path;

        // path maybe removed by prev instances.
        if (!node) return;

        const { value } = node.source;

        if (value.endsWith('.scss')) {
          node.source.value = value.replace('.scss', '.css');
        }
      },
    },
  };
};
