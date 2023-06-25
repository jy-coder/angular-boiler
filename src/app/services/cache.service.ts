import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService implements OnDestroy {
  private cache: Map<string, { data: any; expiration: Date }> = new Map();
  private defaultExpirationMinutes = 30;
  private cleanupIntervalMinutes = 5;
  private cleanupTimer: any;

  constructor() {
    this.startCleanupTimer();
  }

  get<T>(key: string): T | undefined {
    const cacheEntry = this.cache.get(key);

    if (cacheEntry && cacheEntry.expiration > new Date()) {
      return cacheEntry.data as T;
    }

    return undefined;
  }

  set(key: string, data: any, expirationMinutes?: number): void {
    const expiration = new Date();
    expiration.setMinutes(
      expiration.getMinutes() + (expirationMinutes || this.defaultExpirationMinutes)
    );
    this.cache.set(key, { data, expiration });
  }

  clearKey(prefix: string): void {
    this.cache.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopCleanupTimer();
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanupExpiredItems();
    }, this.cleanupIntervalMinutes * 60 * 1000);
  }

  private stopCleanupTimer(): void {
    clearInterval(this.cleanupTimer);
  }

  private cleanupExpiredItems(): void {
    const now = new Date();
    this.cache.forEach((value, key) => {
      if (value.expiration <= now) {
        this.cache.delete(key);
      }
    });
  }
}
