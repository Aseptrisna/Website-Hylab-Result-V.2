import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { BaseState } from "../../models/base_state";
import { User } from "../../models/user";
import { UserApi } from "../../services/user_api";

function ProfileUserComponent({ id }: any) {
  const [state, setState] = useState<BaseState<User>>();

  useEffect(() => {
    UserApi.getUserById(id!, setState);
  }, []);

  return (
    <>
      {state?.data && (
        <div className={"w-full my-5 md:my-10 md:w-[50%]"}>
          <div
            className={"p-3 w-full shadow-sm border-2 border-black rounded-lg"}
          >
            <div
              className={
                "h-full flex flex-col md:flex-row justify-center items-center md:items-start md:justify-start"
              }
            >
              <div className="w-64 bg-gray-500 rounded-lg">
                <img
                  className="h-full w-full aspect-square rounded-lg bg-cover"
                  src={`https://image-view.sta.my.id/data/${
                    state?.data && state.data.data.file_name
                  }`}
                  alt=""
                />
              </div>

              <div
                className={"w-full m-2 md:ml-5 flex justify-between flex-col"}
              >
                <div>
                  <h1
                    className={
                      "text-2xl hidden md:block md:text-left font-bold mb-2"
                    }
                  >
                    Detail
                  </h1>

                  <h1 className="text-2xl text-center font-bold md:hidden">
                    {state.data.data.name}
                  </h1>
                  {/* <p className="p-1 mt-2 text-center bg-slate-200 rounded-md md:hidden">
                                        {state.data.data.username}
                                    </p> */}
                  <table className={"text-lg hidden md:block"}>
                    <tbody>
                      <tr>
                        <td className={"pr-2"}>
                          <FontAwesomeIcon icon={faUser} />
                        </td>
                        <td>
                          <p className="font-bold">NAMA LENGKAP</p>
                        </td>
                        <td className={"md:pl-10"}>:</td>
                        <td>
                          <p>{state?.data && state?.data.data.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className={"pr-2"}>
                          <FontAwesomeIcon icon={faHashtag} />
                        </td>
                        <td>
                          <p className="font-bold">RESPONSSIBILITY</p>
                        </td>
                        <td className={"md:pl-10"}>:</td>
                        <td>
                          <p>{state?.data && state?.data.data.username}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className={"pr-2"}>
                          <FontAwesomeIcon icon={faHashtag} />
                        </td>
                        <td>
                          <p className="font-bold">PRESENCE</p>
                        </td>
                        <td className={"md:pl-10"}>:</td>
                        <td>
                          <p>{state?.data && state?.data.data.username}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileUserComponent;
