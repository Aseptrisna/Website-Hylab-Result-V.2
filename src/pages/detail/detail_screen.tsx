import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { ProctoringApi } from '../../services/proctoring_api';
import { BaseState } from '../../models/base_state';
import { DataEngagement } from '../../models/engagement';
import { datetimeFormatted } from '../../utils/extensions/datetime_formatted';
import '../../index.css';
import { Chart as ChartJs } from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { capitalizeFirst } from '../../utils/extensions/capitalize_first';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DetailScreen() {
  const { id } = useParams();
  const [data, setData] = useState<BaseState<DataEngagement[]>>();
  useEffect(() => {
    ProctoringApi.getDetailProctoring(id!, setData);
  }, []);

  function groupByExpression() {
    const groupedData: { [key: string]: number } = {};

    if (data?.loading) {
      return (
        <div className={'h-screen w-full flex justify-center items-center'}>
          <p>loading...</p>
        </div>
      );
    } else if (data?.error !== undefined) {
      return (
        <div className={'h-screen w-full flex justify-center items-center'}>
          <p>{data?.error}</p>
        </div>
      );
    } else {
      data?.data?.forEach((item) => {
        groupedData[item.expression] = item.confidence;
        if (item.confidence > groupedData[item.expression]) {
          groupedData[item.expression] = item.confidence;
        }
      });
      const expressions = Object.keys(groupedData);

      if (expressions.length <= 1) {
        const emotions = [
          'angry',
          'disgusted',
          'fearful',
          'happy',
          'neutral',
          'sad',
          'surprised',
        ];
        emotions.forEach((emotion) => {
          if (!expressions.includes(emotion)) {
            expressions.push(emotion);
          }
        });
      }
      // create bar
      const datasets = [
        {
          label: 'Confidence',
          data: Object.values(groupedData),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ];
      return (
        <div
          className={'p-5 md:p-10 md:h-[50%] md:w-[50%] lg:h-[50%] lg:w-[50%]'}
        >
          <Radar
            data={{
              labels: expressions,
              datasets: datasets,
            }}
          />
        </div>
      );
    }
  }

  function detailComponent() {
    if (data?.loading) {
      return (
        <div className={'h-screen w-full flex justify-center items-center'}>
          <p>loading...</p>
        </div>
      );
    } else if (data?.error !== undefined) {
      return (
        <div className={'h-screen w-full flex justify-center items-center'}>
          <p>{data?.error}</p>
        </div>
      );
    } else {
      return (
        <div className={'h-screen overflow-y-scroll'}>
          <div className={'grid grid-cols-2 md:grid-cols-4 gap-2'}>
            {data?.data?.map((item, i) => {
              return (
                <div
                  className={
                    'flex flex-col border-2 border-gray-200 p-2 rounded-lg'
                  }
                >
                  <img
                    className={'w-full h-full aspect-square rounded-lg mb-2'}
                    src={item.image_url}
                    alt=""
                  />
                  <div>
                    <p
                      className={
                        'px-2 py-1 text-white rounded inline bg-gray-500'
                      }
                    >
                      {capitalizeFirst(item.expression)}
                    </p>
                    <p>
                      Confidence:{' '}
                      <span className={'font-bold'}>
                        {(item.confidence * 100).toFixed(2)} %
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  return (
    <div className={'p-2 md:p-5'}>
      <div
        className={
          'flex items-center hover:font-bold active:text-amber-200 cursor-pointer transition duration-500 ease-out'
        }
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <button
          className={'m-2'}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
        >
          Back
        </button>
      </div>
      <div className={'md:flex justify-between'}>
        <div className={'w-full md:w-[50%]'}>
          <div
            className={
              'p-3 w-full shadow-md border-2 border-gray-200 rounded-lg'
            }
          >
            <div className={'h-full flex justify-start'}>
              <div className={' w-32 bg-gray-500 rounded-lg'}>
                <img
                  className={'h-full w-full aspect-square rounded-lg bg-cover'}
                  src={data?.data && data.data[0].image_url}
                  alt=""
                />
              </div>
              <div className={'w-full ml-2 flex justify-between flex-col'}>
                <div>
                  <h1 className={'text-lg font-bold'}>Detail</h1>
                  <table className={'text-sm'}>
                    <tbody>
                      <tr>
                        <td className={'pr-2'}>
                          <FontAwesomeIcon icon={faUser} />
                        </td>
                        <td>
                          <p>Username</p>
                        </td>
                        <td className={'md:pl-10'}>:</td>
                        <td>
                          <p>{data?.data && data?.data[0].username}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className={'pr-2'}>
                          <FontAwesomeIcon icon={faBook} />
                        </td>
                        <td>
                          <p>Course</p>
                        </td>
                        <td className={'md:pl-10'}>:</td>
                        <td>
                          <p>{data?.data && data?.data[0].course}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={'text-[12px] md:text-sm text-right'}>
                  <p>
                    Created at:{' '}
                    {data?.data && datetimeFormatted(data?.data[0].timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={'hidden md:block md:my-10'}>
            <h1 className={'text-lg  mb-5'}>
              Result Detection:{' '}
              <span className={'font-bold'}>{data?.data?.length} Image</span>
            </h1>
            {detailComponent()}
          </div>
        </div>
        {groupByExpression()}
        <div className={'my-10 md:hidden'}>
          <h1 className={'text-lg mb-5'}>
            Result Detection: {data?.data?.length} Image
          </h1>
          {detailComponent()}
        </div>
      </div>
    </div>
  );
}

export default DetailScreen;
