import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';

import { IPingService } from '../services/ping.service';
import { PingController } from './ping.controller';

describe('PingController', () => {
  let controller: PingController;
  let pingService: MockProxy<IPingService>;

  let request: Request;
  let response: Response;

  beforeEach(() => {
    pingService = mock<IPingService>();
    controller = new PingController(pingService);

    request = {} as Request;
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ping', () => {
    it('should return the string returned from ping service', async () => {
      pingService.ping.calledWith().mockReturnValue('boom');

      await controller.ping(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ data: 'boom' });
    })
  })
});