import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import BackButton from '../components/back_button';
import ProfileUserComponent from '../user/profile_user';
import CollapseSection from '../components/collapse_section';
import { useEffect, useState } from 'react';
import { BaseState } from '../../models/base_state';
import {
  DataEngagement,
  EngagementImage,
  EngagementModel,
} from '../../models/engagement';
import { ProctoringApi } from '../../services/proctoring_api';
import { CleaningImageApi } from '../../services/cleaning_api';
import { ExpressionImageApi } from '../../services/expression_api';
import { EngagementApi } from '../../services/engagement_api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { selectEmoji } from '../../utils/helpers/select_emoji';

function EngagementScreen() {
  const { userId } = useParams();
  const query = new URLSearchParams(window.location.search);
  const topicId = query.get('topicId');

  const [stateProctoring, setStateProctoring] =
    useState<BaseState<DataEngagement[]>>();
  const [stateCleaning, setStateCleaning] =
    useState<BaseState<EngagementImage[]>>();
  const [stateExpression, setStateExpression] =
    useState<BaseState<EngagementImage[]>>();
  const [stateEngagement, setStateEngagement] =
    useState<BaseState<EngagementModel>>();

  useEffect(() => {
    ProctoringApi.getDetailProctoring(userId!, setStateProctoring);
    CleaningImageApi.getCleaningImage(userId!, topicId!, setStateCleaning);
    ExpressionImageApi.getExpresssionImage(
      userId!,
      topicId!,
      setStateExpression
    );
    EngagementApi.getEngements(userId!, topicId!, setStateEngagement);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="py-28 px-5 md:px-20">
        <div className="flex justify-between items-center">
          <BackButton title={`Engagement Menu`} />
          <h1 className="w-[50%] md:w-full h-full text-end text-sm md:text-md">
            {stateEngagement?.data?.details.courseName} /{' '}
            {stateEngagement?.data?.details.quiz_name}
          </h1>
        </div>

        <ProfileUserComponent id={userId} />

        <CollapseSection
          title={`Proctoring Image (${stateProctoring?.totalData ?? 0} image)`}
          defaultExpanded={false}
          children={
            <div>
              {stateProctoring?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="w-full p-5 flex overflow-x-scroll">
                  {stateProctoring?.data?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                        src={item.image_url}
                        alt={item.image_url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
        />
        <CollapseSection
          title={`Cleaning Image (${stateCleaning?.totalData ?? 0} image)`}
          defaultExpanded={false}
          children={
            <div>
              {stateCleaning?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="w-full p-5 flex overflow-x-scroll">
                  {stateCleaning?.data?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                        src={item.image_url}
                        alt={item.image_url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
        />
        <CollapseSection
          title={`Expressions Image (${stateExpression?.totalData ?? 0} image)`}
          defaultExpanded={false}
          children={
            <div>
              {stateExpression?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="p-5 flex justify-between overflow-x-hidden w-full">
                  <div className="flex w-full overflow-scroll [&>div]:flex-shrink-0">
                    {stateExpression?.data?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="h-[180px] w-[100px] md:h-[250px] md:w-[200px] mr-3 md:mr-5 mb-5 p-2 flex flex-col items-center justify-between bg-slate-100 rounded-lg border-black"
                        >
                          <img
                            className="h-[100px] w-full md:h-[200px] object-cover"
                            src={item.image_url}
                            alt={item.image_url}
                          />
                          <div className="w-full flex flex-col md:flex-row justify-between items-center">
                            <p className="w-full p-1 text-sm md:text-md font-bold border border-black rounded-md text-center">
                              {item.expression.toUpperCase()}
                            </p>
                            <p className="w-full p-1 text-sm md:text-md font-bold border border-black rounded-md text-center">
                              {(item.cf_score * 100).toFixed(2)} %
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          }
        />

        <CollapseSection
          background={stateEngagement?.loading ? null : 'bg-white'}
          title={`Engagement Image (${
            stateEngagement?.data?.expressions.length ?? 0
          } Expression)`}
          defaultExpanded={true}
          children={
            <div>
              {stateExpression?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="my-5 p-5 w-full">
                  <div>
                    {stateEngagement?.data?.expressions.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full my-5 p-2 md:p-5 bg-slate-100 rounded-lg"
                        >
                          <div className="mb-3">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={selectEmoji(item.expression)}
                                className="mr-3 h-5 w-5 md:h-7 md:w-7 "
                              />
                              <h1 className="text-md md:text-2xl font-bold ">
                                {item.expression.toUpperCase()} (
                                {item.expression.length} gambar)
                              </h1>
                            </div>
                            <div className="flex items-center ">
                              <FontAwesomeIcon
                                icon={faPoll}
                                className="mr-3 h-3 w-3 md:h-5 md:w-5"
                              ></FontAwesomeIcon>
                              <h1 className="text-md md:text-xl my-3 ">
                                Average confidence:
                              </h1>
                              <h1 className="text-md md:text-xl m-3 ">
                                {(item.average_confidence * 100).toFixed(2)}%
                              </h1>
                            </div>
                          </div>
                          <div className="w-full flex overflow-x-auto">
                            {item.image_urls.map((item, index) => {
                              return (
                                <img
                                  key={index}
                                  className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                                  src={item}
                                  alt={item}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}

export default EngagementScreen;
