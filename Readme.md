## 安装
```
npm i textcore-tool
```

### 工具函数
> /module/tool.js
#### 导出 tool
- 判断变量是否为空
  - tool.empty( any:变量 )
  - return Boolean
- 判断变量是否为数组或者对象
  - tool.is_array( any:变量 )
  - return Boolean
- 判断变量是否为 Json
  - tool.is_json( any:变量 )
  - return Boolean
- 判断变量是否为数字
  - tool.is_number( any:变量 )
  - return Boolean
- 判断变量是否为 UUID
  - tool.is_uuid( any:变量 )
  - return Boolean
- 查询本地存储
-   tool.get( string:键名 )
  - return any:查询结果
- 设置本地存储
  - tool.is_uuid( any:键名, any:值 )
  - return Boolean
- 删除本地存储
  - tool.del( any:键名 )
  - return Boolean
- 修改数组
  - tool.editArray( array:原始数组, string:键名, any:值 )
  - return Object:修改后的数组
- 生成 UUID
  - tool.uuid()
  - return String:UUID
- 数组相等比对
  - tool.arrayContrast( array:数组1, array:数组2 )
  - return Boolean
  - 说明 : 以 数组1 为标准
- 数组结构相等比对
  - tool.arrayStructureContrast( array:数组1, array:数组2 )
  - return Boolean
  - 说明 : 以 数组1 为标准