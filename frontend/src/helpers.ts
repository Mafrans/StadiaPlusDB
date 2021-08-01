export function formatPlayTime(playTime: number) {
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime - hours * 3600) / 60);

    return `${hours || ''} ${hours ? 'h' : ''} ${minutes} min`;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function largestTimeBetween(a: number, b: number): { value: number, unit: string, abbrUnit: string } {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    let millis = max-min;
    console.log(millis);

    if (millis >= 365 * 24 * 3600 * 1000) {
        return {
            value: Math.floor(millis / (365 * 24 * 3600 * 1000)),
            unit: 'years',
            abbrUnit: 'y'
        };
    }
    else if (millis >= 30.5 * 24 * 3600 * 1000) {
        return {
            value: Math.floor(millis / (30.5 * 24 * 3600 * 1000)),
            unit: 'month',
            abbrUnit: 'm'
        };
    }
    else if (millis >= 24 * 3600 * 1000) {
        return {
            value: Math.floor(millis / (24 * 3600 * 1000)),
            unit: 'days',
            abbrUnit: 'd'
        };
    }
    else if (millis >= 3600 * 1000) {
        return {
            value: Math.floor(millis / (3600 * 1000)),
            unit: 'hours',
            abbrUnit: 'h'
        };
    }

    return {value: null, unit: null, abbrUnit: null};
}