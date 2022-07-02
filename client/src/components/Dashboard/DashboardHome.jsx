import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaCheck, FaEdit, FaRegWindowClose } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/image/default-profile.jpg";
import blur from "../../assets/image/PermittedImage/blurImage.jpg";
import closeup from "../../assets/image/PermittedImage/cropImg.jpg";
import fullView from "../../assets/image/PermittedImage/fullView.jpg";
import group from "../../assets/image/PermittedImage/groupImg.jpg";
import side from "../../assets/image/PermittedImage/sideImg.jpg";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import CompleteView from "../../subcomponents/dashboardviews/CompleteView";
import RightwrongImage from "../../subcomponents/PermittedImage/RightwrongImage";

const totalFields = [
  "fullname",
  "phone",
  "dob",
  "lang",
  "email",
  "gender",
  "height",
  "marital",
  "education",
  "work",
  "profession",
  "company",
  "income",
  "religion",
  "caste",
  "country",
  "state",
  "city",
  "smoking",
  "drinking",
  "diet",
  "image",
];

export default function IndexPage() {
  const { registerDet, setregisterDet } = useContext(StateContext);
  const [profileProgress, setProfileProgress] = useState(0);
  const [showRecent, setShowRecent] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showWhoViewed, setShowWhoViewed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    async function fetchUserData() {
      const userlogin = await axios.get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      calcProfileProgress(userlogin.data);
      setregisterDet(userlogin.data);
      console.log(userlogin.data);
    }

    fetchUserData();
  }, []);

  function calcProfileProgress(userData) {
    let count = 0;
    for (let key = 0; key < totalFields.length; key++) {
      if (userData[totalFields[key]]) count++;
    }
    setProfileProgress(Math.round((count * 100) / totalFields.length));
  }

  const showRecentHandler = () => {
    setShowRecent(true);
    setShowSaved(false);
    setShowBlocked(false);
    setShowWhoViewed(false);
  };

  const showSavedHandler = () => {
    setShowSaved(true);
    setShowRecent(false);
    setShowBlocked(false);
    setShowWhoViewed(false);
  };

  const showBlockedHandler = () => {
    setShowBlocked(true);
    setShowRecent(false);
    setShowSaved(false);
    setShowWhoViewed(false);
  };

  const showWhoViewedHandler = () => {
    setShowWhoViewed(true);
    setShowBlocked(false);
    setShowRecent(false);
    setShowSaved(false);
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="lg:flex flex-no-wrap md:mx-40">
          {/* Dashboard Left Part */}
          <div className="lg:w-1/3 mx-2 ">
            <div className=" flex justify-center">
              <LazyLoadImage
                loading="lazy"
                className="  object-cover"
                style={{ height: "220px", minWidth: "100%" }}
                src={registerDet.image ? registerDet.image : defaultImage}
                alt="image"
                effect="blur"
              />
            </div>
            <div className="flex justify-center ">
              {" "}
              <Link
                className="w-full my-1"
                to="/myprofile"
                state={{ data: registerDet }}
              >
                <Btn
                  className="text-sm w-full flex justify-center py-2 !rounded-none"
                  text="Change Profile Picture"
                />
              </Link>
            </div>
            {/* My Profile Section */}
            <div className="mt-1 shadow  ">
              <div className="bg-main-red text-center my-2 py-2 text-white rounded">
                <h1 className="text-lg font-semibold">
                  <Link
                    to={`/${registerDet.userid}`}
                    state={{ data: registerDet }}
                  >
                    My Profile
                  </Link>
                </h1>
              </div>
              <div className="p-4  bg-main-red text-white">
                <h1 className="border-b-[1px] border-gray-300 py-3 cursor-pointer">
                  <Link to="/myprofile">Edit Profile</Link>
                </h1>
                <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showRecentHandler}
                >
                  Recent Profiles
                </h1>
                <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showSavedHandler}
                >
                  Saved Profiles
                </h1>
                <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showWhoViewedHandler}
                >
                  Who Viewed
                </h1>
                <h1
                  className="py-3 cursor-pointer"
                  onClick={showBlockedHandler}
                >
                  Blocked Profiles
                </h1>
              </div>
            </div>
            {/* <PartnerPref
              prefAge={registerDet.prefAge}
              prefOccupation={registerDet.prefOccupation}
            /> */}
            {/* Profile Details Section */}
            {/* <div className="mt-4 shadow  ">
              <div className="bg-main-red text-center py-2 text-white rounded">
                <h1 className="text-lg font-semibold">Profile Details</h1>
              </div>
              <div className="p-4">
                {profileDetailsData.map((data, index) => {
                  return (
                    <div
                      className={`${
                        index < myProfile.length + 4 &&
                        "border-b-[1px] border-gray-300"
                      } py-3 flex justify-between my-1`}
                    >
                      <h1>
                        <Link to={data.path}>{data.title}</Link>{" "}
                      </h1>
                      <div className="bg-gray-600 text-white rounded-full flex justify-center items-center w-8 h-8">
                        {data.notification}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>

          {/* Dashboard Right Part */}
          <div className="w-full overflow-hidden px-4 ">
            <div className="  py-10  text-center">
              <div>
                <h1 className="md:text-6xl text-2xl font-noto-sans text-main-blue leading-loose my-2">
                  Hello, {registerDet.fullname}
                </h1>
                {/* Progress Bar */}
                Your Profile Progress
                <div className="w-full  bg-gray-200 rounded-full  ">
                  <div
                    style={{ width: `${profileProgress}%` }}
                    className={`bg-main-blue  text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-l-full`}
                  >
                    {profileProgress}
                  </div>
                </div>
                <Link to="/myprofile" state={{ data: registerDet }}>
                  {" "}
                  <Btn
                    icon={<FaEdit className="inline" />}
                    text="Complete your profile "
                    className=" my-4 "
                  />
                </Link>
              </div>

              {showBlocked && (
                <CompleteView
                  title="Blocked Profiles"
                  url="/api/auth/blockedProfiles"
                />
              )}
              {showRecent && (
                <CompleteView
                  title="Recently Viewed"
                  url="/api/auth/recentProfiles"
                />
              )}

              <CompleteView
                title="Saved Profiles"
                url="/api/auth/savedProfile"
              />
              {showWhoViewed && (
                <CompleteView
                  title="Who Viewed"
                  url="/api/auth/getWhoViewedMyProfile"
                />
              )}
            </div>

            {/* Uploadable image */}
            <div className="md:flex  justify-between text-main-blue ">
              <div className="my-8">
                <span className="flex justify-center items-center">
                  <FaCheck className="text-green-400" />
                  <h1 className="text-lg font-bold  mx-2">
                    Photos you can upload
                  </h1>
                </span>
                <div className="grid grid-cols-2 md:mr-5 space-x-4">
                  <RightwrongImage img={fullView} title="Full View" />
                  <RightwrongImage img={closeup} title="Close Up" />
                </div>
              </div>

              {/* Image we can't use */}
              <div className="my-8 mb-16 ">
                <span className="flex justify-center  items-center">
                  <FaRegWindowClose className="text-red-700 mx-2" />
                  <h1 className="text-lg font-bold">Photos you can't upload</h1>
                </span>
                <div className="grid grid-cols-3 space-x-4 ">
                  <RightwrongImage img={group} title="Group" />
                  <RightwrongImage img={blur} title="Blur & Watermark" />
                  <RightwrongImage img={side} title="Side Face" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
