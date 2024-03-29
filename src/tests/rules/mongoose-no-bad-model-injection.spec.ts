import { RuleTester } from "@typescript-eslint/rule-tester";
import noBadModelInjectionRule, {
  MessageIdsEnum,
} from "../../rules/mongoose-no-bad-model-injection";

const ruleTester = new RuleTester();

ruleTester.run("mongoose-no-bad-model-injection", noBadModelInjectionRule, {
  valid: [
    {
      code: `class HahaTest {
          constructor(
            @InjectModel(Business.name)
            private readonly bsModel: Model<Business>,
            private readonly nibbleService: NibbleService
          ) {}
        }`,
    },
    {
      code: `export class HahaService {
        constructor(
          @InjectModel(OA.name)
          private readonly aModel: Model<OADoc>,
          private readonly aFactory: AFactory
        ) {}
      }`,
    },
    {
      code: `export class HahaService {
        constructor(
          @InjectModel(OA.name)
          aModel: Model<OADoc>,
        ) {}
      }`,
    },
    {
      code: `class HahaTest {
          constructor(
            private readonly nibbleService: NibbleService,
            @InjectModel(Business.name)
            readonly bsModel: Model<Business>,
          ) {}
        }`,
    },
  ],
  invalid: [
    {
      code: `class HahaTest {
          constructor(
            @InjectModel(Business.name)
            private readonly nibbleService: NibbleService,
            private readonly bsModel: Model<Business>
          ) {}
        }`,
      errors: [{ messageId: MessageIdsEnum.nonModelTypeUsed }],
    },
    {
      code: `class HahaTest {
          constructor(
            @InjectModel(Business.name)
            private readonly nibbleService: Model,
            private readonly bsModel: Model<Business>
          ) {}
        }`,
      errors: [
        {
          messageId: MessageIdsEnum.missingModelType,
        },
      ],
    },
    {
      code: `class HahaTest {
          constructor(
            @InjectModel(Business.name)
            private readonly bsModel
          ) {}
        }`,
      errors: [
        {
          messageId: MessageIdsEnum.missingModelParameterType,
        },
      ],
    },
    {
      code: `class HahaTest {
          constructor(
            @InjectModel(Business.name)
            private readonly,
            private readonly bsModel: Model<Business>
          ) {}
        }`,
      errors: [
        {
          messageId: MessageIdsEnum.missingModelParameterType,
        },
      ],
    },
  ],
});
