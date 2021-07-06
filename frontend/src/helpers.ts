export function formatPlayTime(playTime: number) {
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime - hours * 3600) / 60);

    return `${hours || ''} ${hours ? 'h' : ''} ${minutes} min`;
}