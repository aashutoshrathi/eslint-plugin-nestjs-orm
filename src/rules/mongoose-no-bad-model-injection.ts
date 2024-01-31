import { TSESLint, AST_NODE_TYPES } from "@typescript-eslint/utils";

export enum MessageIdsEnum {
  missingModelType = "missingModelType",
  missingModelParameterType = "missingModelParameterType",
  nonModelTypeUsed = "nonModelTypeUsed",
}

type MessageIds = keyof typeof MessageIdsEnum;

const DECORATOR_NAME = "InjectModel";

const findNodeWithDecorator = (node: any, decoratorName: string) => {
  if (!node.decorators) {
    return null;
  }
  return node.decorators.find(
    (decorator: any) => decorator.expression.callee.name === decoratorName
  );
};

const badModelInjectionRule = (
  context: TSESLint.RuleContext<MessageIds, []>
) => {
  return {
    ClassBody(node: any) {
      const constructorNode = node.body.find(
        (bodyNode: any) =>
          bodyNode.type === AST_NODE_TYPES.MethodDefinition &&
          bodyNode.kind === "constructor"
      );

      if (!constructorNode) {
        return;
      }

      const { params } = constructorNode.value;
      if (!params || params.length === 0) {
        return;
      }

      const paramWithModelDecorator = params.find((param: any) =>
        findNodeWithDecorator(param, DECORATOR_NAME)
      );

      if (!paramWithModelDecorator) {
        return;
      }

      const { parameter } = paramWithModelDecorator;
      if (parameter) {
        if (!parameter.typeAnnotation) {
          return context.report({
            node: paramWithModelDecorator,
            messageId: MessageIdsEnum.missingModelParameterType,
          });
        }

        if (parameter.typeAnnotation?.typeAnnotation) {
          const { typeName, typeParameters } =
            parameter.typeAnnotation.typeAnnotation;

          if (typeName.name !== "Model") {
            return context.report({
              node: paramWithModelDecorator,
              messageId: MessageIdsEnum.nonModelTypeUsed,
            });
          }

          if (!typeParameters || typeParameters?.params?.length !== 1) {
            return context.report({
              node: paramWithModelDecorator,
              messageId: MessageIdsEnum.missingModelType,
            });
          }
        }
      }
    },
  };
};

const rule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    schema: [],
    messages: {
      nonModelTypeUsed: "Parameter type should be Model<T>",
      missingModelParameterType: "Parameter doesn't have a type annotation",
      missingModelType:
        "Parameter type should be Model<T>, where T is the model type",
    },
  },
  create: badModelInjectionRule,
};

export default rule;
