import axios, { AxiosResponse } from 'axios';

import { makeAutoObservable } from 'mobx';
import userSimulation from 'src/models/userSimulation';

class UserBaselineRepository {
  url = 'v2/userSimulations';

  constructor() {
    makeAutoObservable(this);
  }
  loadData(data: any) {}
  async create(body: any): Promise<userSimulation> {
    const res: AxiosResponse<userSimulation> = await axios.post(this.url, body);
    return res.data;
  }

  async find(params: any): Promise<userSimulation[] | undefined> {
    const res: AxiosResponse<userSimulation[]> = await axios.get(this.url, {
      params,
    });
    return res.data;
  }

  async findOne(params: any): Promise<userSimulation | undefined> {
    const res: AxiosResponse<userSimulation> = await axios.get(
      this.url + '/custom',
      {
        params,
      }
    );
    return res.data;
  }

  async update(body: any): Promise<userSimulation[] | undefined> {
    const res: AxiosResponse<userSimulation[]> = await axios.patch(
      this.url,
      body
    );
    return res.data;
  }

  async delete(params: any) {
    const res: AxiosResponse<userSimulation[]> = await axios.delete(this.url, {
      params,
    });
    return res.data;
  }
}
export default UserBaselineRepository;
