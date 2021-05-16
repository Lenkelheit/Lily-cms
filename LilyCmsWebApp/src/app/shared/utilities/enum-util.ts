export abstract class EnumUtil {
    static getEnumKeys<T>(e: T) {
        return Object.keys(e).filter(k => typeof e[k as any] === 'number');
    }
}
