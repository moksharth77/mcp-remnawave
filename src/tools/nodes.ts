import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { RemnawaveClient } from '../client/index.js';
import { toolResult, toolError } from './helpers.js';

export function registerNodeTools(server: McpServer, client: RemnawaveClient) {
    server.tool(
        'nodes_list',
        'List all Remnawave nodes',
        {},
        async () => {
            try {
                const result = await client.getNodes();
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_get',
        'Get a specific node by UUID',
        {
            uuid: z.string().describe('Node UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.getNodeByUuid(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_create',
        'Create a new node in Remnawave',
        {
            name: z.string().describe('Node name'),
            address: z.string().describe('Node address (IP or hostname)'),
            port: z.number().optional().describe('Node port'),
            countryCode: z
                .string()
                .optional()
                .describe('Country code (e.g. US, DE, NL)'),
            isTrafficTrackingActive: z
                .boolean()
                .optional()
                .describe('Enable traffic tracking'),
            trafficLimitBytes: z
                .number()
                .optional()
                .describe('Traffic limit in bytes'),
            trafficResetDay: z
                .number()
                .optional()
                .describe('Day of month to reset traffic (1-31)'),
            notifyPercent: z
                .number()
                .optional()
                .describe('Traffic notification threshold percentage'),
            consumptionMultiplier: z
                .number()
                .optional()
                .describe('Traffic consumption multiplier'),
            activeConfigProfileUuid: z
                .string()
                .describe('Config profile UUID to assign'),
            activeInbounds: z
                .array(z.string())
                .describe('Array of inbound UUIDs to enable'),
        },
        async (params) => {
            try {
                const body: Record<string, unknown> = {
                    name: params.name,
                    address: params.address,
                    configProfile: {
                        activeConfigProfileUuid:
                            params.activeConfigProfileUuid,
                        activeInbounds: params.activeInbounds,
                    },
                };
                if (params.port !== undefined) body.port = params.port;
                if (params.countryCode !== undefined)
                    body.countryCode = params.countryCode;
                if (params.isTrafficTrackingActive !== undefined)
                    body.isTrafficTrackingActive =
                        params.isTrafficTrackingActive;
                if (params.trafficLimitBytes !== undefined)
                    body.trafficLimitBytes = params.trafficLimitBytes;
                if (params.trafficResetDay !== undefined)
                    body.trafficResetDay = params.trafficResetDay;
                if (params.notifyPercent !== undefined)
                    body.notifyPercent = params.notifyPercent;
                if (params.consumptionMultiplier !== undefined)
                    body.consumptionMultiplier = params.consumptionMultiplier;

                const result = await client.createNode(body);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_update',
        'Update an existing node',
        {
            uuid: z.string().describe('Node UUID to update'),
            name: z.string().optional().describe('New node name'),
            address: z.string().optional().describe('New address'),
            port: z.number().optional().describe('New port'),
            countryCode: z.string().optional().describe('New country code'),
            isTrafficTrackingActive: z
                .boolean()
                .optional()
                .describe('Enable/disable traffic tracking'),
            trafficLimitBytes: z
                .number()
                .optional()
                .describe('New traffic limit'),
            trafficResetDay: z
                .number()
                .optional()
                .describe('New traffic reset day'),
            notifyPercent: z
                .number()
                .optional()
                .describe('New notification threshold'),
            consumptionMultiplier: z
                .number()
                .optional()
                .describe('New consumption multiplier'),
        },
        async (params) => {
            try {
                const result = await client.updateNode(params);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_delete',
        'Delete a node from Remnawave',
        {
            uuid: z.string().describe('Node UUID to delete'),
        },
        async ({ uuid }) => {
            try {
                await client.deleteNode(uuid);
                return toolResult({
                    success: true,
                    message: `Node ${uuid} deleted`,
                });
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_enable',
        'Enable a disabled node',
        {
            uuid: z.string().describe('Node UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.enableNode(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_disable',
        'Disable a node',
        {
            uuid: z.string().describe('Node UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.disableNode(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_restart',
        'Restart a specific node',
        {
            uuid: z.string().describe('Node UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.restartNode(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_restart_all',
        'Restart all nodes',
        {},
        async () => {
            try {
                const result = await client.restartAllNodes();
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_reset_traffic',
        'Reset traffic counter for a node',
        {
            uuid: z.string().describe('Node UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.resetNodeTraffic(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'nodes_reorder',
        'Reorder nodes by providing an ordered array of UUIDs',
        {
            uuids: z
                .array(z.string())
                .describe('Ordered array of node UUIDs'),
        },
        async ({ uuids }) => {
            try {
                const result = await client.reorderNodes(uuids);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );
}
