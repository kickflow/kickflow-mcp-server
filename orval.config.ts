import { defineConfig } from 'orval'

const INPUT_FILE = 'schema.yaml'
const OUTPUT_DIR = 'src/kickflow-api/generated'

export default defineConfig({
  kickflow: {
    input: {
      target: INPUT_FILE,
    },
    output: {
      mode: 'split',
      target: OUTPUT_DIR,
      client: 'axios',
      prettier: true,
      override: {
        header: false,
        mutator: {
          path: 'src/kickflow-api/custom-axios-instance.ts',
          name: 'customAxiosInstance',
          extension: '.js',
        },
      },
    },
  },
  kickflowZod: {
    input: {
      target: INPUT_FILE,
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      prettier: true,
      target: OUTPUT_DIR,
      fileExtension: '.zod.ts',
      override: {
        header: false,
      },
    },
    hooks: {
      afterAllFilesWrite: 'node scripts/orval-hook.js && npm run format',
    },
  },
})
