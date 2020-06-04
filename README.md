> React 组件库

## Installation

Install with npm:

```bash
npm install --save-dev jun-react
```

Install with yarn:

```bash
yarn add jun-react --dev
```

## Usage

ES6 module:

```jsx
import { Countdown } from 'jun-react';

// 60秒倒计时
ReactDOM.render(
  <Countdown count={60} suffix="s" />,
  mountNode
);
```

Script:

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="utf-8">
  <title>jun-react</title>
  <link rel="stylesheet" type="text/css" href="jun-react.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript" charset="utf-8" src="react.js"></script>
  <script type="text/javascript" charset="utf-8" src="react-dom.js"></script>
  <script type="text/javascript" charset="utf-8" src="browser.js"></script>
  <script type="text/javascript" charset="utf-8" src="jun-react.js"></script>
  <script type="text/babel">
    const Countdown = junReact.Countdown;
    // 60秒倒计时
    ReactDOM.render(
      <Countdown count={60} suffix="s" />,
      document.getElementById('root')
    );
  </script>
</body>
</html>
```

## Note
部分组件需要引入样式

## Components

### Countdown
**倒计时**

| Property | Description | Type | Default |
| :------- | :---------- | :--- | :------ |
| className | 样式类 | string  | - |
| count | 计数 | number | 0 |
| type | 类型，可选值为`normal`常规、`hour`小时 | string | normal |
| prefix | 文案前缀 | prefix | - |
| suffix | 文案后缀 | suffix | - |
| onComplete | 倒计时结束回调| function | - |

### ImgCatch
**图片异常捕获**

| Property | Description | Type | Default |
| :------- | :---------- | :--- | :------ |
| src | 图片资源 | string | - |
| blanksrc | 空白页图片资源 | string | - |
| onError | 图片加载失败回调 | function | - |
| ... | 其他图片属性 | any | - |

### ImgView
**移动端图片全屏预览**

样式：`jun-react/lib/components/imgView/style.css`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | :------ |
| src | 图片资源 | string | - |
| ... | 其他图片属性 | any | - |

### Pagination
**缺省总条数的分页**

样式：`jun-react/lib/components/pagination/style.css`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | :------ |
| prefixCls | 样式前缀 | string | jun-pagination |
| className | 样式类 | string  | - |
| current | 当前页数 | number | 1 |
| pageSize | 每页条数 | number | 10 |
| dataSize | 当前页数据总数 | number | - |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | function(page, pageSize) | noop |
| disabled | 禁用分页 | boolean | false |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| showSizeChanger | 是否展示`pageSize`切换器 | boolean | false |
| pageSizeOptions | 指定每页可以显示多少条 | string[] | ['10', '20', '30', '40'] |