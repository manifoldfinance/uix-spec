/**
 * @exports prettier-config-conformance
 * @version 1.3.0
 * @summary base config adapted from AirBNB to reduce AST Diff Churn
 * @schema http://json.schemastore.org/prettierrc
 */

'use strict';

// @ts-check
/**
 * @type {import('prettier').Options}
 */
 module.exports = {
   arrowParens: 'always',
   bracketSameLine: true,
   bracketSpacing: false,
   embeddedLanguageFormatting: 'auto',
   htmlWhitespaceSensitivity: 'strict',
   insertPragma: false,
   jsxSingleQuote: false,
   printWidth: 110,
   proseWrap: 'always',
   quoteProps: 'consistent',
   requirePragma: false,
   semi: true,
   singleQuote: true,
   tabWidth: 2,
   trailingComma: 'all',
   useTabs: false,
   vueIndentScriptAndStyle: false,
   plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
   importOrder: [
     "^(react|react-dom)$",
     "^next.+$",
     "^@.+$",
     "^[^\\/]+$",
     "^.+\\.(svg|png|jpg|jpeg|webp)$",
     "^.+\\/.+$",
     "^[./]",
     "^[../]",
   ],
   importOrderSeparation: true,
   importOrderSortSpecifiers: true,
 };
