import { beforeEach, describe, expect, it } from '@jest/globals';
import { PingService } from './ping.service';

describe('PingService', () => {
  let service: PingService;

  beforeEach(() => {
    service = new PingService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ping', () => {
    it('should return pong', () => {
      expect(service.ping()).toBe('pong');
    })
  })
});