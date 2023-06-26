import { CacheService } from '../../app/services/cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    service = new CacheService();
  });

  afterEach(() => {
    service.clear();
  });

  it('should get stored data from cache', () => {
    const key = 'testKey';
    const data = { name: 'John' };

    service.set(key, data);

    const result = service.get(key);

    expect(result).toEqual(data);
  });

  it('should return undefined if data is not found in cache', () => {
    const key = 'testKey';

    const result = service.get(key);

    expect(result).toBeUndefined();
  });

  it('should set data in cache with default expiration', () => {
    const key = 'testKey';
    const data = { name: 'John' };

    service.set(key, data);

    const cacheEntry = service['cache'].get(key);

    expect(cacheEntry?.data).toEqual(data);
    expect(cacheEntry?.expiration).toBeInstanceOf(Date);
    expect(cacheEntry?.expiration.getTime()).toBeGreaterThan(new Date().getTime());
  });

  it('should set data in cache with custom expiration', () => {
    const key = 'testKey';
    const data = { name: 'John' };
    const expirationMinutes = 10;

    service.set(key, data, expirationMinutes);

    const cacheEntry = service['cache'].get(key);

    expect(cacheEntry?.data).toEqual(data);
    expect(cacheEntry?.expiration).toBeInstanceOf(Date);
    expect(cacheEntry?.expiration.getMinutes()).toBeGreaterThan(new Date().getMinutes());
    expect(cacheEntry?.expiration.getMinutes()).toBe(new Date().getMinutes() + expirationMinutes);
  });

  it('should clear specific key from cache', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data1 = { name: 'John' };
    const data2 = { name: 'Jane' };

    service.set(key1, data1);
    service.set(key2, data2);

    service.clearKey(key1);

    expect(service.get(key1)).toBeUndefined();
    expect(service.get(key2)).toEqual(data2);
  });

  it('should clear all data from cache', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data1 = { name: 'John' };
    const data2 = { name: 'Jane' };

    service.set(key1, data1);
    service.set(key2, data2);

    service.clear();

    expect(service.get(key1)).toBeUndefined();
    expect(service.get(key2)).toBeUndefined();
  });

  it('should stop the cleanup timer on ngOnDestroy', () => {
    jest.spyOn(service as any, 'stopCleanupTimer');

    service.ngOnDestroy();

    expect((service as any).stopCleanupTimer).toHaveBeenCalled();
  });
});
