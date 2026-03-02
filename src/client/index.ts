import { REST_API } from '@remnawave/backend-contract';
import { Config } from '../config.js';

export class RemnawaveClient {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(config: Config) {
        this.baseUrl = config.baseUrl;
        this.headers = {
            Authorization: `Bearer ${config.apiToken}`,
            'Content-Type': 'application/json',
        };
    }

    private async request<T = unknown>(
        method: string,
        path: string,
        body?: unknown,
    ): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const options: RequestInit = {
            method,
            headers: this.headers,
        };
        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }
        const res = await fetch(url, options);
        if (!res.ok) {
            let errorMessage: string;
            try {
                const errorBody = await res.json();
                errorMessage =
                    (errorBody as { message?: string }).message ||
                    JSON.stringify(errorBody);
            } catch {
                errorMessage = `HTTP ${res.status} ${res.statusText}`;
            }
            throw new Error(`Remnawave API error: ${errorMessage}`);
        }
        return res.json() as Promise<T>;
    }

    private async get<T = unknown>(path: string): Promise<T> {
        return this.request<T>('GET', path);
    }

    private async post<T = unknown>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('POST', path, body);
    }

    private async patch<T = unknown>(
        path: string,
        body?: unknown,
    ): Promise<T> {
        return this.request<T>('PATCH', path, body);
    }

    private async delete<T = unknown>(path: string): Promise<T> {
        return this.request<T>('DELETE', path);
    }

    // Users

    async getUsers(start = 0, size = 25) {
        return this.get(
            `${REST_API.USERS.GET}?start=${start}&size=${size}`,
        );
    }

    async getUserByUuid(uuid: string) {
        return this.get(REST_API.USERS.GET_BY_UUID(uuid));
    }

    async getUserByUsername(username: string) {
        return this.get(REST_API.USERS.GET_BY.USERNAME(username));
    }

    async getUserByShortUuid(shortUuid: string) {
        return this.get(REST_API.USERS.GET_BY.SHORT_UUID(shortUuid));
    }

    async createUser(params: Record<string, unknown>) {
        return this.post(REST_API.USERS.CREATE, params);
    }

    async updateUser(params: Record<string, unknown>) {
        return this.patch(REST_API.USERS.UPDATE, params);
    }

    async deleteUser(uuid: string) {
        return this.delete(REST_API.USERS.DELETE(uuid));
    }

    async enableUser(uuid: string) {
        return this.post(REST_API.USERS.ACTIONS.ENABLE(uuid));
    }

    async disableUser(uuid: string) {
        return this.post(REST_API.USERS.ACTIONS.DISABLE(uuid));
    }

    async revokeUserSubscription(uuid: string) {
        return this.post(REST_API.USERS.ACTIONS.REVOKE_SUBSCRIPTION(uuid));
    }

    async resetUserTraffic(uuid: string) {
        return this.post(REST_API.USERS.ACTIONS.RESET_TRAFFIC(uuid));
    }

    // Nodes

    async getNodes() {
        return this.get(REST_API.NODES.GET);
    }

    async getNodeByUuid(uuid: string) {
        return this.get(REST_API.NODES.GET_BY_UUID(uuid));
    }

    async createNode(params: Record<string, unknown>) {
        return this.post(REST_API.NODES.CREATE, params);
    }

    async updateNode(params: Record<string, unknown>) {
        return this.patch(REST_API.NODES.UPDATE, params);
    }

    async deleteNode(uuid: string) {
        return this.delete(REST_API.NODES.DELETE(uuid));
    }

    async enableNode(uuid: string) {
        return this.post(REST_API.NODES.ACTIONS.ENABLE(uuid));
    }

    async disableNode(uuid: string) {
        return this.post(REST_API.NODES.ACTIONS.DISABLE(uuid));
    }

    async restartNode(uuid: string) {
        return this.post(REST_API.NODES.ACTIONS.RESTART(uuid));
    }

    async restartAllNodes() {
        return this.post(REST_API.NODES.ACTIONS.RESTART_ALL);
    }

    async resetNodeTraffic(uuid: string) {
        return this.post(REST_API.NODES.ACTIONS.RESET_TRAFFIC(uuid));
    }

    async reorderNodes(uuids: string[]) {
        return this.post(REST_API.NODES.ACTIONS.REORDER, uuids);
    }

    // Hosts

    async getHosts() {
        return this.get(REST_API.HOSTS.GET);
    }

    async getHostByUuid(uuid: string) {
        return this.get(REST_API.HOSTS.GET_BY_UUID(uuid));
    }

    async createHost(params: Record<string, unknown>) {
        return this.post(REST_API.HOSTS.CREATE, params);
    }

    async updateHost(params: Record<string, unknown>) {
        return this.patch(REST_API.HOSTS.UPDATE, params);
    }

    async deleteHost(uuid: string) {
        return this.delete(REST_API.HOSTS.DELETE(uuid));
    }

    // System

    async getStats() {
        return this.get(REST_API.SYSTEM.STATS.SYSTEM_STATS);
    }

    async getBandwidthStats() {
        return this.get(REST_API.SYSTEM.STATS.BANDWIDTH_STATS);
    }

    async getNodesMetrics() {
        return this.get(REST_API.SYSTEM.STATS.NODES_METRICS);
    }

    async getNodesStatistics() {
        return this.get(REST_API.SYSTEM.STATS.NODES_STATS);
    }

    async getHealth() {
        return this.get(REST_API.SYSTEM.HEALTH);
    }

    async getMetadata() {
        return this.get(REST_API.SYSTEM.METADATA);
    }

    async generateX25519() {
        return this.get(REST_API.SYSTEM.TOOLS.GENERATE_X25519);
    }

    // Subscriptions

    async getSubscriptions(start = 0, size = 25) {
        return this.get(
            `${REST_API.SUBSCRIPTIONS.GET}?start=${start}&size=${size}`,
        );
    }

    async getSubscriptionByUuid(uuid: string) {
        return this.get(REST_API.SUBSCRIPTIONS.GET_BY.UUID(uuid));
    }

    async getSubscriptionByUsername(username: string) {
        return this.get(REST_API.SUBSCRIPTIONS.GET_BY.USERNAME(username));
    }

    async getSubscriptionByShortUuid(shortUuid: string) {
        return this.get(REST_API.SUBSCRIPTIONS.GET_BY.SHORT_UUID(shortUuid));
    }

    async getSubscriptionInfo(shortUuid: string) {
        return this.get(REST_API.SUBSCRIPTION.GET_INFO(shortUuid));
    }

    // Config Profiles / Inbounds

    async getConfigProfiles() {
        return this.get(REST_API.CONFIG_PROFILES.GET);
    }

    async getAllInbounds() {
        return this.get(REST_API.CONFIG_PROFILES.GET_ALL_INBOUNDS);
    }

    // Internal Squads

    async getInternalSquads() {
        return this.get(REST_API.INTERNAL_SQUADS.GET);
    }

    async createInternalSquad(params: Record<string, unknown>) {
        return this.post(REST_API.INTERNAL_SQUADS.CREATE, params);
    }

    async updateInternalSquad(params: Record<string, unknown>) {
        return this.patch(REST_API.INTERNAL_SQUADS.UPDATE, params);
    }

    async deleteInternalSquad(uuid: string) {
        return this.delete(REST_API.INTERNAL_SQUADS.DELETE(uuid));
    }

    async addUsersToSquad(squadUuid: string, userUuids: string[]) {
        return this.post(
            REST_API.INTERNAL_SQUADS.BULK_ACTIONS.ADD_USERS(squadUuid),
            { userUuids },
        );
    }

    async removeUsersFromSquad(squadUuid: string, userUuids: string[]) {
        return this.post(
            REST_API.INTERNAL_SQUADS.BULK_ACTIONS.REMOVE_USERS(squadUuid),
            { userUuids },
        );
    }

    // HWID

    async getUserHwidDevices(userUuid: string) {
        return this.get(REST_API.HWID.GET_USER_HWID_DEVICES(userUuid));
    }

    async deleteHwidDevice(deviceUuid: string) {
        return this.post(REST_API.HWID.DELETE_USER_HWID_DEVICE, {
            uuid: deviceUuid,
        });
    }

    async deleteAllUserHwidDevices(userUuid: string) {
        return this.post(REST_API.HWID.DELETE_ALL_USER_HWID_DEVICES, {
            userUuid,
        });
    }

    // Bandwidth Stats

    async getNodesBandwidth() {
        return this.get(REST_API.BANDWIDTH_STATS.NODES.GET);
    }

    async getNodesRealtimeBandwidth() {
        return this.get(REST_API.BANDWIDTH_STATS.NODES.GET_REALTIME);
    }

    async getUserBandwidthByUuid(uuid: string) {
        return this.get(REST_API.BANDWIDTH_STATS.USERS.GET_BY_UUID(uuid));
    }

    // Auth

    async getAuthStatus() {
        return this.get(REST_API.AUTH.GET_STATUS);
    }
}
