> 倒计时

## API

| Name | Description | Type | Default |
| :--- | :--- | :--- | :--- | :--- | :--- |
| className | 样式类 | string  | - |
| count | 计数 | number | 0 |
| type | 类型，可选值为`normal`常规、`hour`小时 | string | normal |
| prefix | 文案前缀 | prefix | - |
| suffix | 文案后缀 | suffix | - |
| onComplete | 倒计时结束回调| function | - |

```jsx
// 60秒倒计时
<Countdown
  count={60}
  suffix="s"
/>
// 1小时倒计时
<Countdown
  count={60 * 60}
  type="hour"
/>
```
