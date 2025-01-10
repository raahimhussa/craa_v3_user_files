export default interface IDomain {
  _id?: any
  name: string
  isDeleted?: boolean
  parentId: string
  children: IDomain[]
  createdAt?: Date
  updatedAt?: Date
}
