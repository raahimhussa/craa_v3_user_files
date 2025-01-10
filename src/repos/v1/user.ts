import Repository from '../repository';
class UserRepository extends Repository<any> {
  constructor() {
    super('v1/users');
  }
}
export default UserRepository;
