import axios from "axios";
import tool from "./tool.js";

export default class apiStructure {
    /**
     * 构造函数
     */
    constructor( data = {} ) {
        this.host = data['host'] ?? ''; // 请求开始执行函数
        this.start = data['start'] ?? function(){}; // 请求开始执行函数
        this.end = data['end'] ?? function(){}; // 请求结束执行函数
        this.error = data['error'] ?? function(){}; // 请求错误执行函数
        this.check = data['check'] ?? false; // 请求检查执行函数
        this.list = data['list'] ?? {}; // API 列表
        this.header = data['header'] ?? {}; // 附加请求头
        this.timeout = data['timeout'] ?? 15000; // 加载超时时间
    }
    /**
     * 发起一个网络请求
     * @param {object} data 请求数据
     * @param {object} options 其它参数
     * @returns 请求结果
     */
    async send( data, options = {} ) {
        // 必须包含链接数据
        if ( tool.empty( data.link ) ) { return { data: false, error: false }; }
        if ( /^[A-Za-z]+$/.test( data.link ) && this.list[data.link] ) {
            data.link = this.list[data.link];
        }
        if ( !/^https?:\/\//.test( data.link ) ) {
            data.link = this.host + data.link;
        }
        // 加载开始
        this.start( data, options );
        // 加载应用配置
        let request = '';
        try {
            // 组织请求头
            data.header = tool.is_array( data.header ) ? data.header : {};
            if ( !tool.empty( data.post ) ) {
                // POST 请求
                const type = tool.is_json( data.post ) ? 'application/json' : 'multipart/form-data';
                request = await axios.post( data.link, data.post, {
                    timeout: options.timeout || this.timeout,
                    headers: {
                        'Content-Type': type,
                        ...this.header, ...data.header
                    },
                    ...options,
                });
            }else {
                // GET 请求
                request = await axios.get( data.link, {
                    timeout: options.timeout || this.timeout,
                    headers: {
                        'Content-Type': 'application/json',
                        ...this.header, ...data.header
                    },
                    ...options,
                });
            }
            // 数据转换
            if ( tool.is_json( request.data ) ) {
                request.data = JSON.parse( request.data );
            }
            // 请求完成
            this.end( request.data );
            // 执行用户任务
            if ( typeof data.run === 'function' ) {
                if ( data.check === true && typeof this.check === 'function' ) {
                    this.check( request.data, data );
                }else {
                    data.run( request.data );
                }
            }
            // 返回数据
            return { data: request.data, error: false };
        }catch ( err ) {
            // 发生错误
            this.error( err );
            // 执行用户任务
            if ( typeof data.error === 'function' ) {
                data.error( err );
            }
            // 返回数据
            return { data: false, error: err };
        }
    }
};