import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import Simulation from 'src/models/simulation';
class SimulationRepository {
  url = 'v1/simulations';

  constructor() {
    makeAutoObservable(this);
  }

  async create(body: any): Promise<AxiosResponse<Simulation>> {
    return axios.post(this.url, body);
  }

  async find(params: any): Promise<AxiosResponse<Simulation[]>> {
    return axios.get(this.url, { params });
  }

  async findOne(params: any): Promise<AxiosResponse<Simulation>> {
    return axios.get(this.url, {
      params,
    });
  }

  async update(body: any): Promise<AxiosResponse<Simulation[]>> {
    return axios.patch(this.url, body);
  }

  async delete(params: any): Promise<AxiosResponse<Simulation[]>> {
    return axios.delete(this.url, {
      params,
    });
  }
}
export default SimulationRepository;
