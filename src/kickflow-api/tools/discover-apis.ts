import { RegisterTool } from '../../types.js'
import { apiDefinitions } from '../generated/api-definitions.js'

const discoverApisTool: RegisterTool = {
  name: 'discover_apis',
  description: `利用可能なKickflow APIの一覧を表示します。get_api_info、call_apiで使用するoperationIdを確認するために使用してください。`,
  callback: async () => {
    const lines = apiDefinitions.map(
      ({ operationId, summary }) => `${operationId}: ${summary}`,
    )
    return {
      content: [
        {
          type: 'text',
          text: lines.join('\n'),
        },
      ],
    }
  },
}

export default discoverApisTool
