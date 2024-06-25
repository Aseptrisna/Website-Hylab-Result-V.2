import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ConstantApp } from "../../constant/constant";
import Logo from "../../assets/logo.png";

interface LogData {
  _id: string;
  guid: string;
  guid_device: string;
  timestamp: number;
  value: string;
  datetime: string;
  status: boolean;
  createdAt: string;
}

interface ApiResponse {
  code: number;
  status: boolean;
  message: string;
  totalPages: number;
  currentPage: number;
  dataLogs: LogData[];
}

const HistoryScreen: React.FC = () => {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData(1, selectedDate);
  }, [selectedDate]);

  const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    // Ubah format tanggal dari "DD-MM-YYYY" menjadi "YYYY-MM-DD" untuk kebutuhan API
    const formattedDate = inputDate.split("-").reverse().join("-");
    setSelectedDate(formattedDate);
  };

  const fetchData = async (page: number, date: string) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `${ConstantApp.BASEURL}/result/get/camera/${page}/30?date=${date}`
      );
      if (response.data.status) {
        setLogs(response.data.dataLogs);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } else {
        console.error("Gagal memuat data:", response.data.message);
      }
    } catch (error: any) {
      console.error("Gagal memuat data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1, selectedDate);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1, selectedDate);
    }
  };

  const handleResetFilter = () => {
    setSelectedDate("");
  };

  // Menampilkan galeri dengan 1 baris dan 5 gambar per baris
  const renderGallery = () => {
    return (
      <div className="grid grid-cols-5 gap-4">
        {logs.map((log) => (
          <div key={log._id} className="relative">
            <img
              src={`https://hylab.pptik.id/data/raw_data/${log.value}`}
              alt={log.value}
              className="w-full h-auto rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white text-center py-1">
              {log.datetime}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md">
        <div className=" flex flex-wrap items-center justify-center md:justify-between mx-auto p-5">
          <div className={"flex"}>
            <img src={Logo} alt="" className={"h-12 w-12 md:mr-5"} />
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                HYLAB CAMERA HISTORY
              </span>
            </a>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateFilter}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleResetFilter}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Reset Filter
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {logs.length === 0 ? (
              <p className="text-gray-600 text-lg text-center">
                No data available for this date.
              </p>
            ) : (
              renderGallery()
            )}
            {logs.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Prev
                </button>
                <span className="text-lg text-gray-800">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
