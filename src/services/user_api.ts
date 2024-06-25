import axios from 'axios';
import { ConstantApp } from '../constant/constant';
import { BaseState } from '../models/base_state';
import { User } from '../models/user';

export class UserApi {
  // get all user
  static async getAllUser(page: number, setData: any, date:any) {
    setData(BaseState.loading());
    try {
      let url: string = `${
        ConstantApp.BASEURL
      }/result/get/${page}/${5}/?date=${date}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.datahasil;
        // change to model engagement
        let users: User[] = responseJson.map((item: any) => item as User);
        
        setData(
          BaseState.success(
            users,
            response.data.currentPage,
            response.data.totalPages
          )
        );
      } else {
        setData(BaseState.error('Error get data from server'));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error('Error get data from server'));
    }
  }

  // get user by id
  static async getUserById(userId: string, setData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/result/get/${userId}`;
      let response = await axios.get(url);
      // console.log(response);
      if (response.status === 200) {
        let responseJson = response.data;
        // console.log(responseJson)

        // change to model engagement
        let user: User = responseJson as User;
        setData(BaseState.success(user));
      } else {
        setData(BaseState.error(`Error get data ${userId} from server`));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error(`Error get data ${userId} from server`));
    }
  }

  // search user by fullname
  static async searchUser(fullname: string, setData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/users/search/${fullname}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;
        // change to model engagement
        let users: User[] = responseJson.map((item: any) => item as User);
        setData(BaseState.success(users));
      } else {
        setData(BaseState.error(`Error get data ${fullname} from server`));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error(`Error get data ${fullname} from server`));
    }
  }
}
