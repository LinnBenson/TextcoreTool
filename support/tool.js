const tool = {
    /**
     * 判断变量是否为空
     * @param {string} v 变量
     * @returns boolean
     */
    empty: function( v ) {
        switch( typeof v ) {
            case 'undefined':
                return true;
            case 'string':
                if ( v.replace( /(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '' ).length === 0 ) return true;
                break;
            case 'boolean':
                if ( !v ) return true;
                break;
            case 'number':
                if ( 0 === v || isNaN( v ) ) return true;
                break;
            case 'object':
                if ( null === v || v.length === 0 ) return true;
                for ( var i in v ) { return false; }
                return true;
            default: break;
        }
        return false;
    },
    /**
     * 判断变量是否为数组或者对象
     * @param {any} v 判断对象
     * @returns boolean
     */
    is_array: function( v ) {
        if ( v === '' || v === null ) { return false; }
        if ( Array.isArray( v ) || typeof v === 'object' ) {
            return true;
        }
        return false;
    },
    /**
     * 判断变量是否为 Json
     * @param {any} v 判断对象
     * @returns boolean
     */
    is_json: function( v ) {
        if ( v === '' || v === null ) { return false; }
        try {
            const check = JSON.parse( v );
            if ( this.is_array( check ) ) {
                return true;
            } else {
                return false;
            }
        } catch ( error ) {
            return false;
        }
    },
    /**
     * 判断变量是否为数字
     * @param {any} v 判断对象
     * @returns boolean
     */
    is_number: function( v ) {
        if ( typeof v === 'number' ) { return true; }
        if ( typeof v === 'string' ) { return /^-?\d*\.?\d+$/.test( v ); }
        return false;
    },
    /**
     * 判断变量是否为 UUID
     * @param {any} v 判断对象
     * @returns boolean
     */
    is_uuid: function( v ) {
        if ( typeof v === 'string' ) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test( v ); }
        return false;
    },
    /**
     * 查询本地存储
     * @param {string} key 键名
     * @returns 查询结果
     */
    get: function( key ) {
        let data = localStorage.getItem( key );
        if ( this.is_json( data ) ) { data = JSON.parse( data ); }
        return data;
    },
    /**
     * 设置本地存储
     * @param {string} key 键名
     * @param {string} value 数据
     * @returns boolean
     */
    set: function( key, value ) {
        if ( this.is_array( value ) ) {
            value = JSON.stringify( value );
        }
        return localStorage.setItem( key, value );
    },
    /**
     * 删除本地存储
     * @param {string} key 键名
     * @returns boolean
     */
    del: function( key ) {
        return localStorage.removeItem( key );
    },
    /**
     * 修改数组
     * @param {Array} original 原始数组
     * @param {string} key 键
     * @param {any} value 值
     * @returns array
     */
    editArray: function( original, key, value ) {
        key = key.split( '.' );
        switch ( key.length ) {
            case 1:
                original[key[0]] = value;
                break;
            case 2:
                original[key[0]][key[1]] = value;
                break;
            case 3:
                original[key[0]][key[1]][key[2]] = value;
                break;
            case 4:
                original[key[0]][key[1]][key[2]][key[3]] = value;
                break;

            default: break;
        }
        return original;
    },
    /**
     * 生成 UUID
     * @param {string|boolean} check 检查 UUID
     * @returns UUID
     */
    uuid: function( check = false ) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if ( check ) { return uuidRegex.test( check ); }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : ( ( r & 0x3 ) | 0x8 );
            return v.toString( 16 );
        });
    },
    /**
     * 数组相等比对
     * @param {array} $array1 数组
     * @param {array} $array2 数组
     * @returns boolean
     */
    arrayContrast: function( $array1, $array2 ) {
        if ( !tool.is_array( $array1 ) || !tool.is_array( $array2 ) ) { return false; }
        return JSON.stringify( $array1 ) === JSON.stringify( $array2 )
    },
    /**
     * 数组结构比对
     * @param {array} $array1 数组
     * @param {array} $array2 数组
     * @returns boolean
     */
    arrayStructureContrast: function( $array1, $array2, del = [] ) {
        if ( !tool.is_array( $array1 ) || !tool.is_array( $array2 ) ) { return false; }
        for ( const key in $array1 ) {
            if ( del.includes( key ) ) { continue; }
            if ( $array1[key] && typeof $array1[key] !== typeof $array2[key] ) {
                return false;
            }
            if ( tool.is_array( $array1[key] ) ) {
                if ( !tool.arrayStructureContrast( $array1[key], $array2[key] ) ) {
                    return false;
                }
            }
        }
        return true;
    }
};

export default tool;