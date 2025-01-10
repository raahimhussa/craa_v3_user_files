export interface ISimDoc {
  _id: any;
  title: string;
  id: number;
  files: any[];
  folderId: string;
  children: Array<any>;
  expanded: boolean;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
  totalPage: number;
  currentPage: number;
  scale: number;
  kind: string;
  numberOfPillsPrescribed: number;
  numberOfPillsTakenBySubject: number;
  numberOfPillsToShow: number;
  documentId: string | null;
}
