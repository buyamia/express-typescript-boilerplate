import { Service } from 'typedi';

import { Logger } from '@lib/logger';

@Service()
export class PingService {
  private readonly logger = new Logger('PingService');

  public ping(pong: string = 'pong'): string {
    this.logger.debug('ping: Replied with ' + pong);
    return pong;
  }
}
