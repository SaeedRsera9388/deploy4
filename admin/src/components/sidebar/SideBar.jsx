import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import BarChartIcon from "@mui/icons-material/BarChart";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SlUserFollow } from "react-icons/sl";
import { MdOutlineRateReview } from "react-icons/md";
import { TfiComments } from "react-icons/tfi";
import { FaPhotoVideo } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaYoutubeSquare } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";
import { RiApps2AddFill } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
const SideBar = () => {
  const { user, dispatch } = useContext(AuthContext, DarkModeContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user"); // Remove user data from local storage
  };
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Sera Summer Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/programs" style={{ textDecoration: "none" }}>
            <li>
              <RiApps2AddFill className="icon" />
              <span>Programs</span>
            </li>
          </Link>
          <Link to="/plans" style={{ textDecoration: "none" }}>
            <li>
              <GrPlan className="icon" />
              <span>Plans</span>
            </li>
          </Link>
          <Link to="/tickets" style={{ textDecoration: "none" }}>
            <li>
              <CreditScoreIcon className="icon" />
              <span>tickets</span>
            </li>
          </Link>
          <Link to="/inquiries" style={{ textDecoration: "none" }}>
            <li>
              <FaPersonCircleQuestion className="icon" />
              <span>inquiries</span>
            </li>
          </Link>
          <Link to="/reviews" style={{ textDecoration: "none" }}>
            <li>
              <MdOutlineRateReview className="icon" />
              <span>reviews</span>
            </li>
          </Link>
          <Link to="/comments" style={{ textDecoration: "none" }}>
            <li>
              <TfiComments className="icon" />
              <span>comments</span>
            </li>
          </Link>
          <Link to="/photos" style={{ textDecoration: "none" }}>
            <li>
              <FaPhotoVideo className="icon" />
              <span>Photos</span>
            </li>
          </Link>
          <Link to="/clients" style={{ textDecoration: "none" }}>
            <li>
              <TiBusinessCard className="icon" />
              <span>Clients</span>
            </li>
          </Link>
          <Link to="/subscribes" style={{ textDecoration: "none" }}>
            <li>
              <SlUserFollow className="icon" />
              <span>Subscribe</span>
            </li>
          </Link>
          <Link to="/youtubes" style={{ textDecoration: "none" }}>
            <li>
              <TfiYoutube className="icon" />
              <span>Youtube</span>
            </li>
          </Link>
          <p className="title">USEFUL INFORMATION</p>
          <Link to="/videos" style={{ textDecoration: "none" }}>
            <li>
              <FaYoutubeSquare className="icon" />
              <span>Video</span>
            </li>
          </Link>
          <li className="schedule">
            <RiCalendarScheduleFill className="icon" />
            <a href="https://1drv.ms/f/c/28f9c25e0d95d62c/EizWlQ1ewvkggCioAQAAAAABkfFXN-0yTjfrNtSq4_-ICQ?e=y6Zsyf">
              
              <span>Schedule</span>
            </a>
          </li>
          <li>
            <BarChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <CircleNotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">Setting</p>
          <Link to="/accounts" style={{ textDecoration: "none" }}>
            <li>
              <MdAccountBalance className="icon" />
              <span>Account</span>
            </li>
          </Link>
          <p className="title">USER</p>
          {user ? (
            <>
              <li>
                <AccountCircleIcon className="icon" />
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </li>
              <li onClick={handleLogout}>
                <LogoutIcon className="icon" />
                <span>Log out</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <AccountCircleIcon className="icon" />
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
        {/* <div className="colorOption"></div>
        <div className="colorOption"></div> */}
      </div>
    </div>
  );
};

export default SideBar;
