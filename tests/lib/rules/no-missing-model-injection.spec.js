const { RuleTester } = require('eslint');
const noMissingModelInjectionRule = require("../../../lib/rules/no-missing-model-injection")

const ruleTester = new RuleTester();

ruleTester.run('no-missing-model-injection', noMissingModelInjectionRule, {
    valid: [{
        code: `{
          constructor(
            @InjectModel(Business.name)
            private readonly bsModel: Model<Business>,
            private readonly nibbleService: NibbleService
          ) {}
        }`
    }],
    invalid: [{
        code: `{
          constructor(
            @InjectModel(Business.name)
            private readonly nibbleService: NibbleService,
            private readonly bsModel: Model<Business>
          ) {}
        }`,
        errors: [{ messageId: 'invalidModelInjection' }],
    }]
});