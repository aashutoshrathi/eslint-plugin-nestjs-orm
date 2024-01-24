/**
 * @fileoverview Checks for erroneous practices using ORM with NestJS
 * @author aashutoshrathi
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { TSESLint } from "@typescript-eslint/utils";
import noBadModelInjectionRule from "./rules/no-bad-model-injection";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

export const rules = {
  "no-bad-model-injection": noBadModelInjectionRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
