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
  - tool.arrayStructureContrast( array:数组1, array:数组2, array:跳过检查的键 )
  - return Boolean
  - 说明 : 以 数组1 为标准

### API 请求工具
> /module/api.js
#### 导出 apiStructure
- 定义请求工具
  - const api = apiStructure({
    host: string:请求主机|'';
    start: function:请求开始执行函数,
    end: function:请求结束执行函数,
    error: function:请求错误执行函数,
    check: function:请求检查执行函数,
    list: object:API 列表,
    header: object:附加请求头,
    timeout: number:加载超时时间|15000,
  });
- 修改配置信息
  - api.editConfig( data );
- 发起网络请求
  - api.send({
    link: string:请求链接,
    header: object:请求头设置,
    post: object:请求数据,
    check: boolean:结果检查|false,
    method: function:请求成功执行,
    error: function:请求错误执行,
  }, object:其它参数|{} );
  - return any:请求结果
  - 说明 post 可为 JSON 或者数组，当此项内容为空时，请求方式为 GET。

### WS 请求工具
> /module/ws.js
#### 导出 wsStructure
- 定义请求工具
  - const ws = wsStructure({
    host: string:请求主机|'';
    start: function:开始连接执行函数,
    end: function:结束连接执行函数,
    check: function:收到消息执行函数,
    heartbeatTime: number:心跳检查时间|15000,
    method: object:回调函数|{},
  });
- 修改配置信息
  - ws.editConfig( data );
- 连接服务器
  - ws.linkServer()
- 心跳处理方式
  - ws.heartbeat();
- 发送消息到服务器
  - ws.send( data );
- 主动关闭连接
  - ws.close()
- 添加回调函数
  - ws.addMethod( name, func )
- 删除回调函数
  - ws.addMethod( name )