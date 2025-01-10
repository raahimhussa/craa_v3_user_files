import { Alert } from '@utils';
import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';
import { FileItem } from './types';

export default class FileStore implements IStore {
  store: RootStore;
  router: RouterStore;

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this);
  }
  loadData(data: any) {}
  *postFile(fileItem: FileItem) {
    let result = null;
    try {
      const res: AxiosResponse = yield axios.post('v1/files', fileItem);
      result = res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    }
    return result;
  }

  *putFileToS3(signedUrl: string, file: File) {
    try {
      yield axios.put(signedUrl, file);
    } catch (error) {
      console.error(error);
    }
  }

  *S3Sign(filename: string, type: string) {
    let result: FileItem | null = null;
    const file = {
      name: filename,
      type: type,
    };

    try {
      const res: AxiosResponse = yield axios.post('v1/files/sign', file);
      result = res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    }
    return result;
  }

  *singleUpload(file: File | Blob, index: number) {
    axios.defaults.withCredentials = false;
    try {
      const convertedFile: File = this.convertBlobToFile(file, index);

      const filename = convertedFile.name;
      const type = convertedFile.type;

      const { signedUrl, url } = yield this.S3Sign(filename, type);

      yield this.putFileToS3(signedUrl!, convertedFile);

      // const fileItem: FileItem = this.buildFileItem(convertedFile, url);

      // const result: FileItem = yield this.postFile(fileItem);

      return url;
    } catch (error) {
      Alert.handle(error);
    }
  }

  buildFileItem(file: File, url: string) {
    const fileItem: FileItem = {
      name: file.name,
      mimeType: file.type,
      size: file.size,
      url: url,
    };
    return fileItem;
  }

  convertBlobToFile(file: File | Blob, index: number): File {
    const {
      uiState: { simulationMode },
    } = this.store;
    if (file instanceof File) {
      return file;
    }
    // const filename = String(Math.floor(Math.random() * 90000) + 10000);
    const filename =
      this.store.screenRecorderStore.simId +
      '_' +
      this.store.screenRecorderStore.recordId +
      '_' +
      index;
    const _file: File = new File([file], filename, { type: file.type });

    return _file;
  }
}
