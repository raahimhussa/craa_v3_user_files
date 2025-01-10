export default interface IClient {
  _id: any
  name: string
  authCode: string
  whitelist: Array<string>
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}
