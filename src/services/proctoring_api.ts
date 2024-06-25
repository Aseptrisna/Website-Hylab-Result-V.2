import { DataEngagement, Engagement } from '../models/engagement';
import axios from 'axios';
import { ConstantApp } from '../constant/constant';
import { BaseState } from '../models/base_state';

export class ProctoringApi {
  // all data result engagement
  static async getProctorings(page: number, setData: any, setTempData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/proctoring?page=${page}&limit=10`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;
        // change to model engagement
        let proctorings: Engagement[] = responseJson.map(
          (item: any) => item as Engagement
        );
        setTempData(proctorings);
        setData(BaseState.success(proctorings));
      } else {
        setData(BaseState.error('Error get data from server'));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error('Error get data from server'));
    }
  }

  // detail data result engagement
  static async getDetailProctoring(proctoringId: string, setData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/proctoring/${proctoringId}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;
        // change to model engagement
        let proctorings: DataEngagement[] = responseJson.map(
          (item: any) => item as DataEngagement
        );

        setData(BaseState.success(proctorings, 1, 1, response.data.totalItems));
      } else {
        setData(BaseState.error(`Error get data ${proctoringId} from server`));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error(`Error get data ${proctoringId} from server`));
    }
  }
}
