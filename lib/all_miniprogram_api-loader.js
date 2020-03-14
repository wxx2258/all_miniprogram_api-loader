const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const parser = require('@babel/parser');
const loaderUtils = require('loader-utils');
const apiTransform = require('./apiTransform');
const apiList = ['request'];

module.exports = function(source) {
    const {globalName} = loaderUtils.getOptions(this);
    const ast = parser.parse(source, {
        // 根据源码内容添加 sourceType 和 plugins
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
    });
    traverse(ast, {
        Program(path) {
            // 在对应 AST 节点上进行操作和修改
        },
        CallExpression(path) {

        },
        MemberExpression(path) {
            const currentObjName = path.node.object.name;
            const currentPropertyName = path.node.property.name;

            if (apiList.includes(currentPropertyName)) {
                if (currentObjName !== globalName) {
                    path.node.object.name = globalName;
                    apiTransform(currentPropertyName, globalName, path);
                }
            }
        }
    });
    const transformCode = generate(ast, {}).code;

    return transformCode;
}