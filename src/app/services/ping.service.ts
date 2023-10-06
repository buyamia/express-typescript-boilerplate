export interface IPingService {
  ping(): string
}

export class PingService implements IPingService {
  public ping(): string {
    return "pong";
  }
}