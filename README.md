# eslint-plugin-nestjs-orm

Guardrails to prevent bad practices or do some serious mistakes when using NestJS Moongose or ORMs.

## Motivation 💡 

No one likes unused variables, and we remove them.
But with Mongoose there is a catch, if you attach inject model to non-model variable accidentally, you will get no error, but you will get a bug. This plugin will help you to avoid this.

One such incident is shown below:

<img alt="GIF of mishap" src="https://s3.ap-south-1.amazonaws.com/shared.aashutosh.dev/eslint-rule-gif.gif">

## Installation 🛠️ 

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nestjs-orm`:

```sh
npm install eslint-plugin-nestjs-orm --save-dev
```

## Usage 🚀

Add `nestjs-orm` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "nestjs-orm"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "nestjs-orm/no-bad-model-injection": "error"
    }
}
```

## Tools Used 💪🏻 

- [AST Explorer](https://astexplorer.net/)
- [ESLint Developer Guide](https://eslint.org/docs/developer-guide/working-with-rules)
- [TypeScript ESLint Docs](https://typescript-eslint.io/developers/custom-rules)