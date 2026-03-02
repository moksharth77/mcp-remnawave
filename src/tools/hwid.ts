import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { RemnawaveClient } from '../client/index.js';
import { toolResult, toolError } from './helpers.js';

export function registerHwidTools(
    server: McpServer,
    client: RemnawaveClient,
) {
    server.tool(
        'hwid_devices_list',
        'List HWID devices for a specific user',
        {
            userUuid: z.string().describe('User UUID'),
        },
        async ({ userUuid }) => {
            try {
                const result = await client.getUserHwidDevices(userUuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'hwid_device_delete',
        'Delete a specific HWID device',
        {
            deviceUuid: z.string().describe('HWID device UUID to delete'),
        },
        async ({ deviceUuid }) => {
            try {
                const result = await client.deleteHwidDevice(deviceUuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );

    server.tool(
        'hwid_devices_delete_all',
        'Delete all HWID devices for a user',
        {
            userUuid: z.string().describe('User UUID'),
        },
        async ({ userUuid }) => {
            try {
                const result =
                    await client.deleteAllUserHwidDevices(userUuid);
                return toolResult(result);
            } catch (e) {
                return toolError(e);
            }
        },
    );
}
