import { Request, Response } from 'express';
import { IPingService } from '../services/ping.service';

export class PingController {
  constructor(
    private pingService: IPingService,
  ) {}

  public async ping(_: Request, res: Response) {
    const data = this.pingService.ping();

    res.status(200).json({ data });
  }
}