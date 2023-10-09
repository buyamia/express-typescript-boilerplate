import { Request, Response } from 'express';
import { Controller, Get } from '@lib/router';
import { PingService } from '@services/ping.service';
import { ExampleMiddleware, ExampleRequest } from '@middlewares/example.middleware';

@Controller()
export class PingController {
  constructor(
    private pingService: PingService
  ) {}

  @Get()
  public hello(_req: Request, res: Response) {
    res.status(200).json({ data: 'Hello world!' });
  }

  @Get('ping')
  public async ping(req: Request, res: Response) {
    const data = this.pingService.ping(req.query.pong as string);

    res.status(200).json({ data });
  }

  @Get({
    path: 'example',
    middlewares: [ExampleMiddleware],
  })
  public async example(req: ExampleRequest, res: Response) {
    res.status(200).json({ example: 'Data from middleware: ' + req.additionalData });
  }
}
