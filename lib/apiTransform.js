const template = require("@babel/template").default;
const statusTransformVistor =  {
    ObjectMethod(path) {
        path.get('body').unshiftContainer('body', template.ast`
            ${this.paramsName}.status = ${this.paramsName}.statusCode;
            delete ${this.paramsName}.statusCode;
        `);
    }
    // MemberExpression: {
    //     exit(path) {
    //         const paramBinding = path.scope.hasBinding(this.paramsName);

    //         if (path.node.property.name === 'statusCode' && path.node.object.name === this.paramsName) {
    //             path.node.property.name = 'status';
    //         }
    //     }
    // }
}

module.exports = function(apiName, globalName, path) {
    switch(apiName) {
        case 'request':
            switch (globalName) {
                case 'my':
                    const properties =path.container.arguments[0].properties;

                    properties.forEach(node => {
                        const keyName = node.key.name;
                        if (keyName === 'header') {
                            // 处理参数不同
                            node.key.name = 'headers';
                        } else if (keyName === 'success') {
                            const params = node.params[0];

                            // 处理内部回调参数属性不同。res.status
                            if (params && params.type === 'Identifier') {
                                path.findParent(path=> path.isCallExpression())
                                    .traverse(statusTransformVistor, {
                                        paramsName: params.name
                                    });
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}