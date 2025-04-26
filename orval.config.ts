import { defineConfig } from 'orval';

export default defineConfig({
  kickflow: {
    input: {
      target: 'https://developer.kickflow.com/rest/schema.yaml',
      // TODO: 添付ファイルアップロードAPIは、YAMLの型定義が不完全なため、除外する
      filters: {
        mode: 'exclude',
        tags: ['ファイル'],
      },
    },
    output: {
      mode: 'split',
      target: 'src/kickflow-api/generated',
      client: 'axios',
      // prettier: true,
      override: {
        mutator: {
          path: 'src/kickflow-api/custom-axios-instance.ts',
          name: 'customAxiosInstance',
        },
      }
    }
  }
});
