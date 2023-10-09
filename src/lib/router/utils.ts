export const stripEndSlash = (path: string) =>
  path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;

export const addLeadingSlash = (path?: string): string =>
  path ? (path.charAt(0) !== '/' ? '/' + path : path) : '';

export function isPromiseLike(arg: any): arg is Promise<any> {
  return arg != null && typeof arg === 'object' && typeof arg.then === 'function';
}
