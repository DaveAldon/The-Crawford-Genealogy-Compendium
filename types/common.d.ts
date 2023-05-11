export interface GaxiosResponse<T = any> {
  config: GaxiosOptions;
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  request: GaxiosXMLHttpRequest;
}
export interface Headers {
  [index: string]: any;
}
