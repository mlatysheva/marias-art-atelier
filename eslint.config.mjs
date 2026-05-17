import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['app/**/*.ts'],
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
);
