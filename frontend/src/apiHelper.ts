const baseUrl = location.origin;

type APIFetchOptions = {

}
export async function api(path: string, options?: APIFetchOptions): Promise<Response> {
    options = options || {};
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    return await fetch(baseUrl + path);
}

export async function getProfile(name: string, tag: string) {
    const response = await api(`/api/profile/${name}/${tag}`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return await response.json();
}

export async function getAchievementCount(name: string, tag: string, game?: string) {
    const response = await api(`/api/achievements/${name}/${tag}/count?game=${game || ''}`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return parseInt(await response.text());
}

export async function getRecentHistory(name: string, tag: string) {
    const response = await api(`/api/history/${name}/${tag}/?start=0&count=4`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return await response.json();
}