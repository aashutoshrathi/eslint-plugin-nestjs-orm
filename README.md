# eslint-plugin-nestjs-orm

Checks for errorneous practices using ORM with NestJS

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nestjs-orm`:

```sh
npm install eslint-plugin-nestjs-orm --save-dev
```

## Usage

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
