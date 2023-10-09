import { Response } from 'express';
import { Controller, Get, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { PingService } from '@services/ping.service';
import { ExampleMiddleware, ExampleRequest } from '@middlewares/example.middleware';
import { Service } from 'typedi';

@Controller()
@Service()
export class PingController {
  constructor(
    private pingService: PingService
  ) {}

  @Get()
  public hello(@Res() res: Response) {
    return res.status(200).json({ data: 'Hello world!' });
  }

  @Get('/ping')
  public async ping(@QueryParam('pong') pong: string, @Res() res: Response) {
    const data = this.pingService.ping(pong);

    return res.status(200).json({ data });
  }

  @Get('/example')
  @UseBefore(ExampleMiddleware)
  public async example(@Req() req: ExampleRequest, @Res() res: Response) {
    return res.status(200).json({ example: 'Data from middleware: ' + req.additionalData });
  }
}
