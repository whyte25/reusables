import nextVitals from "eslint-config-next/core-web-vitals"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

const config = [
  {
    ignores: [
      ".agents/**",
      ".next/**",
      ".source/**",
      "__registry__/**",
      "build/**",
      "node_modules/**",
      "packages/notify/dist/**",
      "public/r/**",
      "registry/**",
    ],
  },
  ...nextVitals,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
      "react-hooks/use-memo": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]

export default config
