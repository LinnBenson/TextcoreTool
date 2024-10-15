## 安装
```
npm i textcore-tool
```

### 工具函数
> /module/tool.js
#### 导出 tool
##### 判断变量是否为空
- 用法 : tool.empty( any:变量 )
- 输出 : Boolean
##### 判断变量是否为数组或者对象
- 用法 : tool.is_array( any:变量 )
- 输出 : Boolean
##### 判断变量是否为 Json
- 用法 : tool.is_json( any:变量 )
- 输出 : Boolean
##### 判断变量是否为数字
- 用法 : tool.is_number( any:变量 )
- 输出 : Boolean
##### 判断变量是否为 UUID
- 用法 : tool.is_uuid( any:变量 )
- 输出 : Boolean
##### 查询本地存储
- 用法 : tool.get( string:键名 )
- 输出 : any:查询结果
##### 设置本地存储
- 用法 : tool.is_uuid( any:键名, any:值 )
- 输出 : Boolean
##### 删除本地存储
- 用法 : tool.del( any:键名 )
- 输出 : Boolean
##### 修改数组
- 用法 : tool.editArray( array:原始数组, string:键名, any:值 )
- 输出 : Object:修改后的数组
##### 生成 UUID
- 用法 : tool.uuid()
- 输出 : String:UUID
##### 数组相等比对
- 用法 : tool.arrayContrast( array:数组1, array:数组2 )
- 输出 : Boolean
- 说明 : 以 数组1 为标准
##### 数组结构相等比对
- 用法 : tool.arrayStructureContrast( array:数组1, array:数组2 )
- 输出 : Boolean
- 说明 : 以 数组1 为标准