import React, { useEffect, useState } from "react";
import { BaseState } from "../../models/base_state";
import { User } from "../../models/user";
import { UserApi } from "../../services/user_api";
import { useNavigate } from "react-router-dom";
import { CardUser, CardUserLoading } from "../components/card_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHistory } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar";

function DashboardScreen() {
  let navigate = useNavigate();
  const [globalDate, setGlobalDate] = useState<string>("");
  const [data, setData] = useState<BaseState<any[]>>();
  let users: User[] | undefined = data?.data;

  useEffect(() => {
    const currentDate = new Date();

    // Get day, month, and year from the Date object
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month starts from 0, so add 1
    const year = currentDate.getFullYear();

    // Format the date by adding leading zeros if necessary
    const formattedDate = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
    setGlobalDate(formattedDate);
    UserApi.getAllUser(1, setData, formattedDate);
  }, []);

  function handleClick(e: any, userId: number) {
    e.preventDefault();
    navigate(`/detail/${userId}`);
  }

  function listComponent() {
    if (data?.loading) {
      let components = [];
      for (let i = 0; i < 20; i++) {
        components.push(<CardUserLoading key={i} />);
      }
      return components;
    } else if (!users || users.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-gray-600">
            Belum ada data hasil hari ini.
          </p>
        </div>
      );
    } else {
      return users.map((item) => {
        return CardUser(item, (e: any) => handleClick(e, item._id));
      });
    }
  }

  function handleSearch(e: any) {
    let date = e.target.value;
    const originalDate = date;

    // Separate year, month, and day
    const parts = originalDate.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Reassemble in "DD-MM-YYYY" format
    const formattedDate = `${day}-${month}-${year}`;
    setGlobalDate(formattedDate);
    UserApi.getAllUser(1, setData, formattedDate);
  }

  function numberPageIndicator() {
    if (
      !data ||
      !data.lastPage ||
      data.lastPage <= 1 ||
      !users ||
      users.length === 0
    )
      return null;

    let components = [];
    for (let i = 0; i < data.lastPage; i++) {
      components.push(
        <button
          key={i}
          className={
            "py-2 px-4 " +
            (data.page === i + 1 ? "bg-blue-500 text-white" : "bg-white")
          }
          onClick={(e) => {
            UserApi.getAllUser(i + 1, setData, globalDate);
          }}
        >
          {i + 1}
        </button>
      );
    }
    return components.length > 0 ? components : null; // Return null if no pages to show
  }

  return (
    <>
      <Navbar
        actions={
          <div className={"flex items-center w-full md:w-[30%] p-2"}>
            <input
              className={
                "bg-gray-100 rounded-lg border-2 shadow-sm border-gray-200 w-full p-2 mx-2"
              }
              type="date"
              name="search"
              id="search"
              placeholder={"Silahkan cari dengan nama"}
              onChange={(e) => handleSearch(e)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className={"hover:cursor-pointer"}
            />
            <button
              onClick={() => navigate("/history")}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              History
            </button>
          </div>
        }
      />
      <div className={"m-3 pt-32 pb-10 grid grid-cols-2 md:grid-cols-5 gap-4"}>
        {listComponent()}
      </div>

      {/* page indicator */}
      {numberPageIndicator() && (
        <div className={"w-full py-5 my-5"}>
          <div className={"flex justify-center items-center"}>
            {data && data.page && data.page !== 1 && (
              <button
                className={"py-2 px-4"}
                onClick={(e) => {
                  UserApi.getAllUser(data.page - 1, setData, globalDate);
                }}
              >
                Prev
              </button>
            )}
            <div className={"mx-5"}>{numberPageIndicator()}</div>
            {data &&
              data.page !== undefined &&
              data.lastPage !== undefined &&
              data.page !== data.lastPage && (
                <button
                  className={"py-2 px-4"}
                  onClick={(e) => {
                    if (data) {
                      UserApi.getAllUser(data.page + 1, setData, globalDate);
                    }
                  }}
                >
                  Next
                </button>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardScreen;
