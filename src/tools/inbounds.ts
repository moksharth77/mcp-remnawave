import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RemnawaveClient } from '../client/index.js';
import { toolResult, toolError } from './helpers.js';

export function registerInboundTools(
    server: McpServer,
    client: RemnawaveClient,
) {
    server.tool(
        'config_profiles_list',
        'List all config profiles',
        {},
        async () => {
            try {
                const result = await client.getConfigProfiles();
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'inbounds_list',
        'List all inbounds from all config profiles',
        {},
        async () => {
            try {
                const result = await client.getAllInbounds();
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );
}
