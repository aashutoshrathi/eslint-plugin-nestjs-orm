/**
 * @fileoverview Checks for erroneous practices using ORM with NestJS
 * @author aashutoshrathi
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { TSESLint } from "@typescript-eslint/utils";
import noBadModelInjectionRule from "./rules/mongoose-no-bad-model-injection";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

export const rules = {
  "mongoose-no-bad-model-injection": noBadModelInjectionRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
