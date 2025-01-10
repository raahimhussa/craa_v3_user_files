import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import ScreenRecorder from 'src/models/screenRecorder';
class ScreenRecorderRepository {
  url = 'v2/screenRecorders';

  constructor() {
    makeAutoObservable(this);
  }
  loadData(data: any) {
    Object.assign(this, data);
  }
  async create(body: any): Promise<ScreenRecorder> {
    const res: AxiosResponse<ScreenRecorder> = await axios.post(this.url, body);
    return res.data;
  }

  async find(params: any): Promise<ScreenRecorder[] | undefined> {
    const res: AxiosResponse<ScreenRecorder[]> = await axios.get(this.url, {
      params,
    });
    return res.data;
  }

  async findOne(params: any): Promise<ScreenRecorder | undefined> {
    const res: AxiosResponse<ScreenRecorder> = await axios.get(
      this.url + '/custom',
      {
        params,
      }
    );
    return res.data;
  }

  // async update(body: any): Promise<ScreenRecorder[] | undefined> {
  //   const res: AxiosResponse<ScreenRecorder[]> = await axios.patch(
  //     this.url,
  //     body
  //   );
  //   return res.data;
  // }
  async update(body: any): Promise<AxiosResponse<ScreenRecorder[]>> {
    return axios.patch(this.url, body);
  }

  async delete(params: any) {
    const res: AxiosResponse<ScreenRecorder[]> = await axios.delete(this.url, {
      params,
    });
    return res.data;
  }
}
export default ScreenRecorderRepository;
