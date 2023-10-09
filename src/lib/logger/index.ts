import { Logger } from '@lib/logger/logger';

export * from './logger';
export * from './morgan';

export const LoggerInstance = new Logger('app');