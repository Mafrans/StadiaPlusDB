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

export async function getGames(name: string, tag: string) {
    const response = await api(`/api/games/${name}/${tag}`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return await response.json();
}

export async function getAchievements(name: string, tag: string, game?: string, start?: number, count?: number) {
    const response = await api(`/api/achievements/${name}/${tag}/?game=${game ?? ''}&start=${start ?? ''}&count=${count ?? ''}`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return await response.json();
}

export async function getRecentHistory(name: string, tag: string, start?: number, count?: number) {
    const response = await api(`/api/history/${name}/${tag}/?start=${start ?? ''}&count=${count ?? ''}`);
    if (response.status !== 200) {
        throw new Error(response.status + ' - ' + response.statusText);
    }

    return await response.json();
}