import tool from './module/tool.js';


/**
 * Console 调试
 * @param {any} v 输出内容
 * @param {String} color 输出颜色
 * @returns boolean
 */
export const debug = ( v, color = false ) => {
    if ( tool.is_array( v ) ) { return console.table( v ); }
    if ( typeof v === 'boolean' ) { return console.log( `Boolean( %c${v ? 'true' : 'false'}%c )`, `color: ${v ? 'green' : 'red'}`, '' ); }
    if ( typeof v === 'string' && color ) { return console.log( `%c${v}`, `color: ${color}` ); }
    return console.log( v );
}

/**
 * 导出模块
 */
export default tool;