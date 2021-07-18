export function formatPlayTime(playTime: number) {
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime - hours * 3600) / 60);

    return `${hours || ''} ${hours ? 'h' : ''} ${minutes} min`;
}

export function mapAndReduce<T>(object: unknown[], key: string, reducer: (a: T, b: any) => T): T {
    if (object.length === 0) {
        throw TypeError(`Cannot reduce an empty array.`);
    }

    if (!object[0].hasOwnProperty(key)) {
        throw TypeError(`Argument 'object' does not include the key ${key}.`);
    }

    if (!(object[0][key] as T)) {
        throw TypeError(`Argument 'key' is not of the correct type.`)
    }

    return object.map(it => it[key] as T).reduce(reducer);
}