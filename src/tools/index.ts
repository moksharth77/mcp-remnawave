import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RemnawaveClient } from '../client/index.js';
import { registerUserTools } from './users.js';
import { registerNodeTools } from './nodes.js';
import { registerHostTools } from './hosts.js';
import { registerSystemTools } from './system.js';
import { registerSubscriptionTools } from './subscriptions.js';
import { registerInboundTools } from './inbounds.js';
import { registerSquadTools } from './squads.js';
import { registerHwidTools } from './hwid.js';

export function registerAllTools(server: McpServer, client: RemnawaveClient) {
    registerUserTools(server, client);
    registerNodeTools(server, client);
    registerHostTools(server, client);
    registerSystemTools(server, client);
    registerSubscriptionTools(server, client);
    registerInboundTools(server, client);
    registerSquadTools(server, client);
    registerHwidTools(server, client);
}
