import { UrlObject } from 'url';

export declare type Url = UrlObject | string;

export interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}
