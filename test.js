import tool, { debug, apiStructure } from "./index.js";

debug( '=> TextcoreTool test start.\n' );
// TextcoreTool test start.

debug( `生成 UUID : ${tool.uuid()}` );
debug( `数组比对 : ${tool.arrayContrast( { item1: 'test' }, { item1: 'test' } )}` );
debug( `数组结构比对 : ${tool.arrayStructureContrast( { item1: 'test1' }, { item1: 'test2' } )}` );

const api = new apiStructure();

api.send({
    link: 'https://www.google.com'
}).then( res => {
    console.log( res.data );
});

// TextcoreTool test end.
debug( '\n=> TextcoreTool test end.' );