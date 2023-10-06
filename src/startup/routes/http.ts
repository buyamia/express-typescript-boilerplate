import { Express } from 'express';
import { PingController } from '../../app/controllers/ping.controller';
import { PingService } from '../../app/services/ping.service';

export function registerHttpRoutes(app: Express) {
  const pingService = new PingService();
  const pingController = new PingController(pingService);

  app.get('/', pingController.ping);
}