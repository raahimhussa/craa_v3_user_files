import Folder from '.';
import SimDoc from '../simDoc';

export default interface IFolder {
  _id?: any;
  name: string;
  depth: number;
  expanded: boolean;
  folderId: string | null;
  isDeleted?: boolean;
  children: Array<SimDoc | Folder> | undefined;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
