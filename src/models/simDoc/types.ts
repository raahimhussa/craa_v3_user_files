export interface ISimDoc {
  _id?: any
  title: string
  seq?: number
  files: any[]

  folderId: string | null

  expanded?: boolean

  totalPage: number
  currentPage: number
  scale: number

  isDeleted?: boolean
  createdAt?: number
  updatedAt?: number
}
