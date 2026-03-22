
export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(refreshInterval: number) {
        this.#interval = refreshInterval;

        this.#startReapLoop();
    };

    add<T>(key: string, val: T): void {
        this.#cache.set(key, { createdAt: Date.now(), val: val });
    }

    get<T>(key: string): T | undefined {
        if (this.#cache.has(key)) {
            let cacheEntry = this.#cache.get(key);

            return cacheEntry?.val;
        }
    }

    #reap(): void {
        for (let [key, value] of this.#cache) {
            if (value.createdAt < (Date.now() - this.#interval)) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
    }
}
