// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { BaseState } from '../../models/base_state';
// import Navbar from '../components/navbar';
// import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Course } from '../../models/course';
// import { CourseApi } from '../../services/course_api';
// import { Topic } from '../../models/topic';
// import ProfileUserComponent from './profile_user';
// import BackButton from '../components/back_button';

// function DetailUserScreen() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [isSelectCourse, setIsSelectCourse] = useState<boolean>(false);

//   const [stateCourse, setStateCourse] = useState<BaseState<Course[]>>();
//   const [stateTopics, setStateTopics] = useState<BaseState<Topic[]>>();

//   useEffect(() => {
//     CourseApi.getCourseUser(id!, setStateCourse);
//   }, []);

//   async function handleSelectCourse(courseId: number) {
//     setIsSelectCourse(!isSelectCourse);

//     if (!isSelectCourse) {
//       await CourseApi.getTopicsCourse(id!, courseId, setStateTopics);
//     }
//     // change isSelected to true
//     let course: Course[] = [];
//     stateCourse?.data?.forEach((item) => {
//       if (item._id === courseId) {
//         item.data.isSelected = !isSelectCourse;
//       }
//       course.push(item);
//     });

//     setStateCourse(BaseState.success(course));
//   }

//   return (
//     <div className={`w-full`}>
//       <Navbar />

//       <div className={`pt-28 px-5 md:px-20`}>
//         <BackButton title={`Detail User`} />

//         <ProfileUserComponent id={id} />

//         {stateCourse?.data && (
//           <div className="w-full flex">
//             <div className="w-full mr-2">
//               <h1 className="bg-slate-50 mb-5 p-2 rounded-sm text-2xl text-center">
//                 Courses
//               </h1>
//               <div
//                 className={`flex ${
//                   stateCourse?.data.length > 0
//                     ? 'flex-wrap'
//                     : 'justify-center items-center h-[150px]'
//                 }`}
//               >
//                 {stateCourse?.data.length > 0 ? (
//                   stateCourse?.data.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex flex-col justify-evenly items-center w-[150px] h-[150px] md:w-[25%] m-2 p-2 bg-slate-100 shadow-md hover:border border-black active:bg-slate-50 ${
//                         item.data.isSelected != null &&
//                         item.data.isSelected === true
//                           ? 'border-2 border-black'
//                           : ''
//                       } duration-100 rounded-md text-center cursor-pointer`}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleSelectCourse(item._id);
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faFolder}
//                         className="h-10 text-blue-500
//                   "
//                       />
//                       <h1 className="font-bold">{item.data.courseName}</h1>
//                     </div>
//                   ))
//                 ) : (
//                   <h1> Tidak ada course</h1>
//                 )}
//               </div>
//             </div>
//             <div
//               className={`w-full ml-2 ${
//                 isSelectCourse ? 'inline-block' : 'hidden'
//               }`}
//             >
//               <h1 className="bg-slate-50 mb-5 p-2 rounded-sm text-2xl text-center">
//                 Topics
//               </h1>
//               {stateTopics?.loading &&
//                 [1, 2, 3, 4].map((item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="w-full h-14 bg-slate-100 animate-pulse shadow-md p-3 mb-4 rounded-md flex items-center hover:border hover:border-black active:bg-slate-50 duration-200 transition-all cursor-pointer"
//                     ></div>
//                   );
//                 })}
//               {stateTopics?.data &&
//                 stateTopics?.data.map((topic) => {
//                   return (
//                     <div
//                       key={topic._id}
//                       className="bg-slate-100 shadow-md p-3 mb-4 rounded-md flex items-center hover:border hover:border-black active:bg-slate-50 duration-200 transition-all cursor-pointer"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         navigate(`/engagement/${id}?topicId=${topic._id}`);
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faFile}
//                         className="h-10 text-orange-300"
//                       />
//                       <h1 className="font-bold ml-5">{topic.quiz_name}</h1>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DetailUserScreen;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import ProfileUserComponent from './profile_user';
import BackButton from '../components/back_button';
import Modal from '../../pages/components/modal'; // Import komponen modal yang ada

import { ConstantApp } from '../../constant/constant';

function DetailUserScreen() {
  const { id } = useParams(); // Mendapatkan parameter id dari URL

  const [historyLog, setHistoryLog] = useState<any[]>([]); // State untuk data log kamera
  const [totalPages, setTotalPages] = useState<number>(0); // State untuk jumlah halaman total
  const [currentPage, setCurrentPage] = useState<number>(1); // State untuk halaman saat ini
  const [logsPerPage] = useState<number>(5); // Jumlah log per halaman

  const [page, setPage] = useState<number>(1); // State untuk halaman saat ini data log kamera
  const [limit, setLimit] = useState<number>(10); // State untuk jumlah data log kamera per halaman
  const [date, setDate] = useState<string>(''); // State untuk filter tanggal data log kamera

  const [loading, setLoading] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>(''); // State untuk URL gambar modal
  const [showModal, setShowModal] = useState<boolean>(false); // State untuk menampilkan atau menyembunyikan modal

  useEffect(() => {
    const fetchHistoryLog = async () => {
      try {
        const apiUrl = `${ConstantApp.BASEURL}/result/get/camera/${page}/${limit}?date=${date}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        setHistoryLog(data.dataLogs); // Set data log kamera ke state
        setTotalPages(data.totalPages); // Set jumlah halaman total
        setCurrentPage(data.currentPage); // Set halaman saat ini
      } catch (error) {
        console.error('Error fetching history log:', error);
      }
    };

    fetchHistoryLog(); // Panggil fetchHistoryLog saat page, limit, atau date berubah
  }, [page, limit, date]);

  const handleFilterByDate = async () => {
    try {
      const apiUrl = `${ConstantApp.BASEURL}/result/get/camera/${page}/${limit}?date=${date}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      setHistoryLog(data.dataLogs); // Set data log kamera ke state
      setTotalPages(data.totalPages); // Set jumlah halaman total
      setCurrentPage(data.currentPage); // Set halaman saat ini
    } catch (error) {
      console.error('Error fetching history log:', error);
    }
  };

  const handleSearch = (e: any) => {
    let date = e.target.value;

    // Format tanggal ke format yang sesuai dengan API
    const parts = date.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    
    setDate(formattedDate);
  };

  const handleOpenModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl); // Set URL gambar untuk ditampilkan di modal
    setShowModal(true); // Tampilkan modal
  };

  const handleCloseModal = () => {
    setModalImageUrl(''); // Kosongkan URL gambar
    setShowModal(false); // Sembunyikan modal
  };

  return (
    <div className={`w-full`}>
      <Navbar />
      <div className={`pt-28 px-5 md:px-20`}>
        <BackButton title={`Detail User`} />
        <ProfileUserComponent id={id} />

        {/* Bagian Log Kamera */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">History Log Kamera</h1>

          {/* Form input untuk date */}
          <form className="mb-4 flex items-center space-x-4">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700">Date</label> */}
              <input
                className="bg-gray-100 rounded-lg border-2 shadow-sm border-gray-200 w-full p-2 mx-2"
                type="date"
                name="search"
                id="search"
                placeholder="Silahkan cari dengan nama"
                onChange={(e) => handleSearch(e)}
              />
            </div>
    
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleFilterByDate}
            >
              Filter by Date
            </button>
          </form>

          {/* Tabel untuk menampilkan log kamera */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historyLog.map((log, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.datetime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleOpenModal(log.value)} // Ganti dengan properti yang sesuai dari log kamera
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Image
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <nav className="mt-4 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(currentPage > 1 ? currentPage - 1 : currentPage)}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan
                <span className="font-medium mx-1">{logsPerPage * (currentPage - 1) + 1}</span>
                sampai
                <span className="font-medium mx-1">{logsPerPage * currentPage}</span>
                dari
                <span className="font-medium mx-1">{historyLog.length}</span>
                hasil
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => setPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Modal */}
      {showModal && (
        <Modal
          imageUrl={modalImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default DetailUserScreen;

