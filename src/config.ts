export interface Config {
    baseUrl: string;
    apiToken: string;
}

export function loadConfig(): Config {
    const baseUrl = process.env.REMNAWAVE_BASE_URL;
    const apiToken = process.env.REMNAWAVE_API_TOKEN;

    if (!baseUrl) {
        throw new Error('REMNAWAVE_BASE_URL environment variable is required');
    }
    if (!apiToken) {
        throw new Error('REMNAWAVE_API_TOKEN environment variable is required');
    }

    return {
        baseUrl: baseUrl.replace(/\/+$/, ''),
        apiToken,
    };
}
