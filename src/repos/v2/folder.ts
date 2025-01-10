import IFolder from 'src/models/folder/folder.interface';
import Repository from '../repository';
class FolderRepository extends Repository<IFolder> {
  constructor() {
    super('v2/folders');
  }
}
export default FolderRepository;
