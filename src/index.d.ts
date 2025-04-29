import { RedisClientType } from "redis";
/**
 * TTLCache is a custom Map-like class that supports TTL (Time To Live) functionality.
 * It allows items to be stored with an expiration time and automatically removes expired items.
 *
 * @template K - The type of the key
 * @template V - The type of the value
 */
export declare class TTLCache<K, V> extends Map<K, V> {
    private interval;
    private expiration_times;
    private expiration_interval;
    /**
     * Starts the expiration interval if it's not already active.
     * It checks periodically if any items have expired and removes them from the cache.
     */
    private startExpirationInterval;
    /**
     * Constructs a TTLCache instance with an optional expiration interval.
     * If a non-zero interval is provided, the expiration check will run periodically.
     *
     * @param interval - The interval (in milliseconds) for checking expired items.
     */
    constructor(interval?: number);
    /**
     * Sets a value in the cache with an optional TTL (Time To Live).
     * The item will expire after the specified TTL and be automatically removed.
     *
     * @param key - The key of the item to set.
     * @param data - The value associated with the key.
     * @param ttl - The time-to-live (TTL) for the item in milliseconds. Defaults to the interval.
     * @returns The TTLCache instance.
     */
    set(key: K, data: V, ttl?: number): this;
    /**
     * Gets a value from the cache. If the item has expired, it is removed from the cache.
     *
     * @param key - The key of the item to retrieve.
     * @returns The value associated with the key or `undefined` if the item has expired.
     */
    get(key: K): V | undefined;
    /**
     * Deletes a value from the cache.
     *
     * @param key - The key of the item to delete.
     * @returns `true` if the item was deleted, `false` otherwise.
     */
    delete(key: K): boolean;
    /**
     * Clears the entire cache, including expiration times.
     */
    clear(): void;
}
/**
 * LRUCache is a custom Map-like class that implements a Least Recently Used (LRU) cache.
 * It automatically evicts the least recently accessed item when the cache reaches its capacity.
 *
 * @template K - The type of the key.
 * @template V - The type of the value.
 */
export declare class LRUCache<K, V> extends Map<K, V> {
    private capacity;
    /**
     * Constructs a LRUCache instance with a specified capacity.
     * Once the cache reaches the given capacity, the least recently used item will be evicted when adding new items.
     *
     * @param capacity - The maximum number of items the cache can hold before eviction. Defaults to 100.
     */
    constructor(capacity?: number);
    /**
     * Retrieves a value from the cache. If the item exists, it is moved to the end to mark it as the most recently used.
     * If the item does not exist, it returns `undefined`.
     *
     * @param key - The key of the item to retrieve.
     * @returns The value associated with the key or `undefined` if the item does not exist in the cache.
     */
    get(key: K): V | undefined;
    /**
     * Sets a value in the cache. If the cache exceeds its capacity, the least recently used item will be removed.
     *
     * @param key - The key of the item to set.
     * @param value - The value associated with the key.
     * @returns The LRUCache instance.
     */
    set(key: K, value: V): this;
}
/**
 * A simple Redis-based cache with TTL support.
 * @template K The type of cache keys.
 * @template V The type of cached values.
 */
export declare class REDISCache<K extends string, V> {
    private identifier;
    private redis;
    /**
     * Initializes the Redis cache.
     * @param redis The Redis client instance.
     * @param identifier A unique prefix for cache keys.
     */
    constructor(redis: RedisClientType, identifier: string);
    /**
     * Retrieves a value from the cache.
     * @param key The key to retrieve.
     * @returns The cached value, or undefined if not found.
     */
    get(key: K): Promise<V | undefined>;
    /**
     * Stores a value in the cache.
     * @param key The key to store the value under.
     * @param value The value to store.
     * @param ttl Optional TTL (in seconds). If 0, the value does not expire.
     * @returns True if the value was stored successfully, false otherwise.
     */
    set(key: K, value: V, ttl?: number): Promise<boolean>;
    /**
     * Deletes a value from the cache.
     * @param key The key to delete.
     * @returns True if the key was deleted, false otherwise.
     */
    delete(key: K): Promise<boolean>;
    /**
     * Checks if a key exists in the cache.
     * @param key The key to check.
     * @returns True if the key exists, false otherwise.
     */
    has(key: K): Promise<boolean>;
    /**
     * Retrieves all stored values in the cache.
     * @returns An array of cached values.
     */
    values(): Promise<V[]>;
    /**
     * Clears all cache entries under the given identifier.
     */
    clear(): Promise<void>;
    /**
     * Gets the number of stored keys in the cache.
     * @returns The number of cached entries.
     */
    size(): Promise<number>;
}
