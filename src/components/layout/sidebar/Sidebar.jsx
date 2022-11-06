import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusIcon from "../../../assets/images/status.svg";
import UserIcon from "../../../assets/images/user.svg";
import MessageIcon from "../../../assets/images/messages.svg";
import CalenderIcon from "../../../assets/images/calender.svg";
import ApplicationIcon from "../../../assets/images/apps.svg";
import ExitIcon from "../../../assets/images/exit.svg";
import CommentsIcon from "../../../assets/images/CommentIcon.svg";
import {
  setShowApps,
  setShowMessage,
  setShowModalComments,
  setShowProfile,
  setShowStats,
} from "../../../redux/home/home-action";
import { Overlay, Tooltip } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const { side, showProfile, showMessage, showApps, showStats, chartArea } =
    useSelector((state) => state.home);

  const refProfile = useRef();
  const refMessage = useRef();
  const refApps = useRef();
  const refStats = useRef();

  const showModalProfile = () => {
    dispatch(setShowProfile(!showProfile));
    dispatch(setShowMessage(false));
  };

  const showModalApps = () => {
    dispatch(setShowApps(!showApps));
  };

  const showModalStats = () => {
    dispatch(setShowStats(!showStats));
  };

  const showModalMessage = () => {
    dispatch(setShowMessage(!showMessage));
    dispatch(setShowProfile(false));
  };

  const showModalComments = () => {
    dispatch(setShowModalComments(true));
  };

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
    setIsLoading(true);
  };

  const navigate = useNavigate();

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    bar: {
      dataLabels: {
        position: "top",
      },
    },
    title: {
      text: "",
      align: "center",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const options2 = {
    chart: {
      type: "area",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  // outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refProfile.current &&
        !refProfile.current.contains(event.target) &&
        !document.getElementById("profile").contains(event.target)
      ) {
        dispatch(setShowProfile(false));
      }
      if (
        refMessage.current &&
        !refMessage.current.contains(event.target) &&
        !document.getElementById("message").contains(event.target)
      ) {
        dispatch(setShowMessage(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refProfile, refMessage]);

  return (
    <>
      <div className="flex justify-evenly relative h-12">
        <img
          onClick={showModalStats}
          ref={refStats}
          className="w-8 invert"
          alt="alt"
          src={StatusIcon}
        />
        <Overlay target={refStats.current} show={showStats} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              My Tooltip
            </Tooltip>
          )}
        </Overlay>
        <img className="w-8 invert" alt="alt" src={CalenderIcon} />
        <img
          onClick={showModalApps}
          ref={refApps}
          className="w-8 invert"
          alt="alt"
          src={ApplicationIcon}
        />
        <Overlay target={refApps.current} show={showApps} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              My Tooltip
            </Tooltip>
          )}
        </Overlay>
        <img
          onClick={showModalMessage}
          id="message"
          className="w-8 invert"
          alt="alt"
          src={MessageIcon}
        />
        {showMessage && (
          <div
            ref={refMessage}
            id="profile"
            className="absolute text-center w-36 bg-white p-3 -bottom-10 right-72
             flex flex-col items-center z-8 shadow-sm rounded-lg left-0 lg:left-4"
          >
            <div className="text-xs text-gray-400">پيامي در صندوق نداريد</div>
          </div>
        )}
        <img
          id="profile"
          onClick={showModalProfile}
          className="w-8 invert"
          alt="alt"
          src={UserIcon}
        />
        {showProfile && (
          <div
            ref={refProfile}
            id="profile"
            className="absolute w-36 bg-white p-3 -bottom-32 flex flex-col items-center z-10 shadow-sm rounded-lg left-0 lg:-left-12"
          >
            <img className="w-8 " alt="alt" src={UserIcon} />
            <div className="text-sm font-bold mt-3 invert-0 text-black">
              شیما گلستانی
            </div>
            <div className="text-zinc-400 text-xs mt-2 font-bold">
              ویرایش پروفایل
            </div>
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={handleSignOut}
                className="text-black"
              >
                {isLoading ? loadingSvg : "خروج"}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white text-black mt-6 w-full desktop:flex-1 rounded-2.5x p-3 ">
        <div className="font-bold text-center border-b py-3 mt-5">
          <div>شاخص کل</div>
          <div className="mt-2 text-sm">{side.indexLastValue}</div>
        </div>
        <div className="font-bold text-center border-b py-3">
          <div>ارزش بازار</div>
          <div className="mt-2 text-sm">{side.marketValue}</div>
        </div>
        <div className="font-bold text-center border-b py-3">
          <div>تعداد معاملات</div>
          <div className="mt-2 text-sm">{side.numberOfTrades}</div>
        </div>
        <div className="font-bold text-center border-b py-3">
          <div>ارزش معاملات</div>
          <div className="mt-2 text-sm">{side.valueOfTrades}</div>
        </div>
        <div className="font-bold text-center py-3">
          <div>حجم معاملات</div>
          <div className="mt-2 text-sm">{side.volumeOfTrades}</div>
        </div>
        <ReactApexChart
          options={options}
          series={chartArea}
          type="area"
          height={300}
        />
      </div>

      <div className="mt-3 flex justify-center">
        <img
          alt="alt"
          src={ExitIcon}
          style={{ cursor: "pointer" }}
          onClick={handleSignOut}
          className="invert"
        />
        <img
          onClick={showModalComments}
          alt="alt"
          className="mr-7 invert"
          src={CommentsIcon}
        />
      </div>
    </>
  );
};

export default Sidebar;

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
