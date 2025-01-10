export type FileData = Array<FileItem>;

/**
 * @FileItem url signedUrl은 서버에서 생성
 */

export type FileItem = {
  index?: number;
  name: string;
  size?: number;
  mimeType: string;
  url?: string;
  signedUrl?: string;
};

export type CraaButtonProps = {
  state: any;
  path: string;
  image?: boolean;
  pdf?: boolean;
};
