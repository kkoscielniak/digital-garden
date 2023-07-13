---
title: Static Analysis
weight: 3
---

*Static analysis* is a method of debugging that is done by automatically examining the source code **without having to execute the program** with tools like `eslint`, `prettier`, `typescript`, `husky`.

## ESLint

- use `ESLint` extension (by Dirk Baeumer) for VS Code
  - `⌘ + .` provides hints on how to fix the issues
- `eslint` provides a set of recommended rules that can be _extended_:

```json
// .eslintrc
{
  "extends": ["eslint:recommended" /* another extension */],
  "rules": {
    // overrides to extended configurations
  }
}
```

- instead of using `.eslintignore` which is oftenly exactly the same as `.gitignore`, add the flag to `npm script` :
  - `eslint --ignore-path .gitignore .`

## Prettier

- `--ignore-path .gitignore` is supported in Prettier as well
- there's a Prettier [Playground](https://prettier.io/playground) in which we can experiment with the configuration and save it to `.prettierrc`
- use Prettier extension (by Esben Petersen) for VSCode with these options:
  - `editor.defaultFormatter: "esbenp.prettier-vscode"`
  - `editor.formatOnSave: true`
- disable unnecessary ESLint rules with `eslint-config-prettier` extension to make sure Prettier and ESLint won't clash
- `prettier` has a `--list-different` flag used when you want to throw an `Error` if the formatting sucks

## `yarn`

```json
{
  "scripts": {
    "prettier": "prettier --ignore-path .gitignore ",
    "format": "npm run prettier -- --write"
    /** 
    `--` makes yarn to use the parameters of 
    `prettier` script without rewriting them 
    effectively making the `format` script: 
    
    "format": "prettier --ignore-path .gitignore --write" */
  }
}
```

## TypeScript tips

- **use TypeScript**, at least for types analysis (if you can't for compiling for some reason)
- use `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` for `*.ts(x)` files

## Husky

- use `precommit` hooks to statically analyze the codebase
- Husky can be integrated with `lint-staged` for those who don't use editor with Prettier/ESLint plugins

## `npm-run-all`

`npm-run-all` is a tool that allows to run `npm` scripts in parallel:

```json
{
  "scripts": {
    "build": "/* ... */",
    "check-format": "/* ... */",
    "check-types": "/* ... */",
    "lint": "/* ... */",
    "validate": "npm-run-all check-types check-format lint build" // <--
  }
}
```
