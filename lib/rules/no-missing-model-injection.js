const DECORATOR_NAME = 'InjectModel';

const findNodeWithDecorator = (node, decoratorName) => {
    if (!node.decorators) {
        return null;
    }
    return node.decorators.find(decorator => decorator.expression.callee.name === decoratorName);
}

const findConstructorInBody = (node) => {
    if (!node.body) {
        return null;
    }
    return node.body.find(bodyNode => bodyNode.type === 'MethodDefinition' && bodyNode.kind === 'constructor');
}

const modelInjectionRule = (context) => {
    return {
        ClassBody(node) {
            const constructorNode = findConstructorInBody(node);
            if (!constructorNode) {
                return;
            }
            const params = constructorNode.value.params;
            if (!params || params.length === 0) {
                return;
            }

            const paramWithModelDecorator = params.find(param => findNodeWithDecorator(param, DECORATOR_NAME));

            if (!paramWithModelDecorator) {
                return;
            }

            const parameter = paramWithModelDecorator.parameter;
            if (!parameter) {
                return;
            }

            if (parameter.typeAnnotation && parameter.typeAnnotation.typeAnnotation) {
                const { typeName } = parameter.typeAnnotation.typeAnnotation;
                if (!typeName) {
                    return;
                }
                if (typeName.name) {
                    if (typeName.name.startsWith('Model<') && typeName.name.endsWith('>')) {
                        return;
                    }
                    context.report({
                        node: paramWithModelDecorator,
                        messageId: 'invalidModelInjection',
                    });
                }
            }
            
        }
    }
}

module.exports = {
    meta: {
        type: 'problem',
        schema: [],
        messages: {
            invalidModelInjection: 'The statement with @InjectModel() decorator should contain a variable with type Model<T>',
        },
    },
    create: modelInjectionRule,
};