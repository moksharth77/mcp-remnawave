import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { RemnawaveClient } from '../client/index.js';
import { toolResult, toolError } from './helpers.js';

export function registerSubscriptionTools(
    server: McpServer,
    client: RemnawaveClient,
) {
    server.tool(
        'subscriptions_list',
        'List all subscriptions with pagination',
        {
            start: z.number().default(0).describe('Offset for pagination'),
            size: z.number().default(25).describe('Number of subscriptions'),
        },
        async ({ start, size }) => {
            try {
                const result = await client.getSubscriptions(start, size);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'subscriptions_get_by_uuid',
        'Get subscription details by UUID',
        {
            uuid: z.string().describe('Subscription UUID'),
        },
        async ({ uuid }) => {
            try {
                const result = await client.getSubscriptionByUuid(uuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'subscriptions_get_by_username',
        'Get subscription details by username',
        {
            username: z.string().describe('Username'),
        },
        async ({ username }) => {
            try {
                const result =
                    await client.getSubscriptionByUsername(username);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'subscriptions_get_by_short_uuid',
        'Get subscription details by short UUID',
        {
            shortUuid: z.string().describe('Short UUID'),
        },
        async ({ shortUuid }) => {
            try {
                const result =
                    await client.getSubscriptionByShortUuid(shortUuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'subscription_info',
        'Get subscription info by short UUID (public endpoint)',
        {
            shortUuid: z.string().describe('Short UUID'),
        },
        async ({ shortUuid }) => {
            try {
                const result =
                    await client.getSubscriptionInfo(shortUuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );
}
