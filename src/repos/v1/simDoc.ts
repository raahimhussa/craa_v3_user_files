import { ISimDoc } from 'src/models/simDoc/simDoc.interface';
import Repository from '../repository';
class SimDocRepository extends Repository<ISimDoc> {
  constructor() {
    super('v1/simDocs');
  }
}
export default SimDocRepository;
