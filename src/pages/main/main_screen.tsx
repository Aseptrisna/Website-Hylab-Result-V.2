import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProctoringApi } from '../../services/proctoring_api';
import { Engagement } from '../../models/engagement';
import { BaseState } from '../../models/base_state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  CardEngagement,
  CardEngagementLoading,
} from '../components/card_engagement';
import { ConstantApp } from '../../constant/constant';
import Logo from '../../assets/logo192.png';

function MainScreen() {
  let navigate = useNavigate();

  const [data, setData] = useState<BaseState<Engagement[]>>();
  const [tempData, setTempData] = useState<Engagement[]>([]);
  let engagements: Engagement[] | undefined = data?.data;

  useEffect(() => {
    ProctoringApi.getProctorings(1, setData, setTempData);
  }, []);

  function handleClick(e: any, engagementId: number) {
    e.preventDefault();
    navigate(`/detail/${engagementId}`);
  }

  function handleSearch(e: any, query: string) {
    e.preventDefault();
    let temp = tempData?.filter((item) => {
      return item.data.username.includes(query);
    });
    setData(temp && BaseState.success(temp));
  }

  function listComponent() {
    if (data?.loading) {
      let components = [];
      for (let i = 0; i < 20; i++) {
        components.push(<CardEngagementLoading key={i} />);
      }
      return components;
    } else {
      return engagements?.map((item) => {
        return CardEngagement(item, (e: any) => handleClick(e, item._id));
      });
    }
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className=" flex flex-wrap items-center justify-center md:justify-between mx-auto p-5">
          <div className={'flex'}>
            <img src={Logo} alt="" className={'h-12 w-12 md:mr-5'} />
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {ConstantApp.NAME}
              </span>
            </a>
          </div>

          <div className={'flex items-center w-full md:w-[30%] p-2'}>
            <FontAwesomeIcon
              icon={faSearch}
              className={'hover:cursor-pointer'}
            />
            <input
              className={
                'bg-gray-100 rounded-lg border-2 shadow-sm border-gray-200 w-full p-2 mx-2'
              }
              type="text"
              name="search"
              id="search"
              placeholder={'Silahkan cari dengan username'}
              onChange={(e) => handleSearch(e, e.target.value)}
            />
          </div>
        </div>
      </nav>

      <div className={'m-3 pt-32 pb-10 grid grid-cols-2 md:grid-cols-6 gap-4'}>
        {listComponent()}
      </div>
    </>
  );
}

export default MainScreen;
