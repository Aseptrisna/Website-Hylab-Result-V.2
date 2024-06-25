import axios from 'axios';
import { ConstantApp } from '../constant/constant';
import { BaseState } from '../models/base_state';
import { EngagementModel } from '../models/engagement';

export class EngagementApi {
  static async getEngements(userId: string, topicId: string, setData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/engagement?userId=${userId}&topicId=${topicId}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;
        // change to model engagement
        let proctorings: EngagementModel = responseJson;
        setData(BaseState.success(proctorings), 1, 1, response.data.totalItems);
      } else {
        setData(BaseState.error('Error get data from server'));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error('Error get data from server'));
    }
  }
}
