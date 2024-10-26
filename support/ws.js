import tool from "./tool";

export default class wsStructure {
    /**
     * 构造函数
     */
    constructor( data = {}, link = false ) {
        this.editConfig( data );
        if ( link ) { this.linkServer(); }
    }
    /**
     * 修改配置信息
     * @param {object} data 新配置
     */
    editConfig( data ) {
        this.state = false;
        this.server = false;
        this.host = data['host'] ?? ''; // 请求开始执行函数
        this.start = data['start'] ?? function(){}; // 请求开始执行函数
        this.end = data['end'] ?? function(){}; // 请求结束执行函数
        this.check = data['check'] ?? false; // 请求检查执行函数
        this.heartbeatTime = data['heartbeatTime'] ?? 15000; // 心跳检查时间
        this.restart = true; // 自动重连
        this.method = {}; // 自动执行内容
    }
    /**
     * 连接服务器
     */
    linkServer() {
        this.server = new WebSocket( this.host );
        // 连接成功
        this.server.onopen = () => {
            this.state = true;
            // 挂载心跳
            this.heartbeatInt = setInterval( () => {
                this.heartbeat();
            }, this.heartbeatTime );
            // 连接开始
            if ( typeof this.start === 'function' ) { this.start( this ); }
        };
        // 监听到消息
        this.server.onmessage = ( e ) => {
            if ( tool.is_json( e.data ) ) { e.data = JSON.parse( e.data ); }
            this.message = e.data;
            // 收到消息
            if ( typeof this.check === 'function' ) { this.check( e.data, this ); }
        };
        // 连接断开
        this.server.onclose = () => {
            this.state = false;
            clearInterval( this.heartbeatInt );
            // 自动重连
            if ( this.restart === true ) {
                setTimeout( () => { this.linkServer(); }, 3000 );
            }
            // 连接结束
            if ( typeof this.end === 'function' ) { this.end( this ); }
        };
    }
    /**
     * 心跳处理方式
     * @returns boolean
     */
    heartbeat() {
        if ( this.state === true ) {
            return this.send({ action: 'heartbeat', data: [] });
        }
        return false;
    }
    /**
     * 发送消息到服务器
     * @param {any} data 发送数据
     * @returns boolean
     */
    send( data ) {
        if ( this.state === true ) {
            if ( tool.is_array( data ) ) { data = JSON.stringify( data ); }
            return this.server.send( data );
        }
        return false;
    }
    /**
     * 主动关闭连接
     */
    close() {
        this.state = this.restart = false;
        clearInterval( this.heartbeatInt );
        this.server.close();
    }
    /**
     * 添加回调函数
     * @param {string} name 函数名
     * @param {function} func 方法
     */
    addMethod( name, func ) {
        this.method[name] = func;
    }
    /**
     * 删除回调函数
     * @param {string} name 函数名
     */
    delMethod( name ) {
        if ( typeof this.method[name] === 'function' ) {
            delete this.method[name];
        }
    }
}