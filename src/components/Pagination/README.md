> 缺省总条数的分页

## API

| Name | Description | Type | Default |
| :--- | :--- | :--- | :--- | :--- |
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

```jsx
<Pagination
  dataSize={50}
  current={1}
  pageSize={10}
  onChange={this.onPageChange}
/>
```
