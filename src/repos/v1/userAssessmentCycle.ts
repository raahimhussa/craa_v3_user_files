import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
class UserAssessmentCycleRepository {
  url = 'v1/userAssessmentCycles';

  constructor() {
    makeAutoObservable(this);
  }

  async create(body: any): Promise<AxiosResponse<UserAssessmentCycle>> {
    return axios.post(this.url, body);
  }

  async find(params: any): Promise<AxiosResponse<UserAssessmentCycle[]>> {
    return axios.get(this.url, { params });
  }

  async findOne(params: any): Promise<AxiosResponse<UserAssessmentCycle>> {
    return axios.get(this.url, {
      params,
    });
  }

  async update(body: any): Promise<AxiosResponse<UserAssessmentCycle[]>> {
    return axios.patch(this.url, body);
  }

  async delete(params: any): Promise<AxiosResponse<UserAssessmentCycle[]>> {
    return axios.delete(this.url, {
      params,
    });
  }
}
export default UserAssessmentCycleRepository;
