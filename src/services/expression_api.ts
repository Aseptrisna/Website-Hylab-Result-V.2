import axios from 'axios';
import { ConstantApp } from '../constant/constant';
import { BaseState } from '../models/base_state';
import { EngagementImage } from '../models/engagement';

export class ExpressionImageApi {
  static async getExpresssionImage(
    userId: string,
    topicId: string,
    setData: any
  ) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/expression?userId=${userId}&topicId=${topicId}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;

        let expresssionImages: EngagementImage[] = responseJson.map(
          (item: any) => item as EngagementImage
        );

        setData(
          BaseState.success(expresssionImages, 1, 1, response.data.totalItems)
        );
      } else {
        setData(BaseState.error(`Error get data ${userId} from server`));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error(`Error get data ${userId} from server`));
    }
  }
}
