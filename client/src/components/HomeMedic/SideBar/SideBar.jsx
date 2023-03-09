import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import swal from "sweetalert";
//Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../authentication/firebase";
import { useSelector } from "react-redux";

const SideBar = ({ open, handleOpen, path }) => {
  //delete id de localstorage, deslogeo
  const handleLogOut = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(auth).then(() => {
          localStorage.removeItem("idMedic");
          window.location.href = "https://pf-grupo-2.vercel.app/";
        });
      }
    });
  };

  const isActive = useSelector((state) => state.doctor.detail.active);

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          height: "100%",
          position: "relative",
          left: "0",
          top: "10rem",
        }}
      >
        <Stack spacing={2}>
          <Button
            onClick={handleOpen}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              alignSelf: "start",
            }}
          >
            <MenuIcon />
          </Button>
          <Stack
            spacing={1}
            width={open ? 200 : 45}
            style={{
              display: "flex",
              paddingLeft: "11px",
              flexDirection: "column",
              alignItems: "start",
              textAlign: "center",
            }}
          >
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeMedic/Profile">
                {open ? (
                  <div className={style.divbutton}>
                    {path.endsWith("/HomeMedic/Profile") ? (
                      <AccountCircleIcon />
                    ) : (
                      <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                    )}
                    <p>Profile</p>
                  </div>
                ) : path.endsWith("/HomeMedic/Profile") ? (
                  <AccountCircleIcon />
                ) : (
                  <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                )}
              </Link>
            </button>
            {isActive && (
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <Link to="/HomeMedic/Agenda">
                  {open ? (
                    <div className={style.divbutton}>
                      {path.endsWith("/HomeMedic/Agenda") ? (
                        <CalendarMonthIcon />
                      ) : (
                        <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                      )}
                      <p>My Appointments</p>
                    </div>
                  ) : path.endsWith("/HomeMedic/Agenda") ? (
                    <CalendarMonthIcon />
                  ) : (
                    <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                  )}
                </Link>
              </button>
            )}
            {/* {isActive && (
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <Link to="/HomeMedic/Chat">
                  {open ? (
                    <div className={style.divbutton}>
                      {path.endsWith("/HomeMedic/Chat") ? (
                        <ChatIcon />
                      ) : (
                        <ChatIcon style={{ color: "#c2c1c1" }} />
                      )}
                      <p>Chat</p>
                    </div>
                  ) : path.endsWith("/HomeMedic/Chat") ? (
                    <ChatIcon />
                  ) : (
                    <ChatIcon style={{ color: "#c2c1c1" }} />
                  )}
                </Link>
              </button>
            )} */}

            {isActive && (
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <Link to="/HomeMedic/MedicalEmergency">
                  {open ? (
                    <div className={style.divbutton}>
                      {path.endsWith("/HomeMedic/MedicalEmergency") ? (
                        <MedicalServicesIcon />
                      ) : (
                        <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                      )}
                      <p>Urgency</p>
                    </div>
                  ) : path.endsWith("/HomeMedic/MedicalEmergency") ? (
                    <MedicalServicesIcon />
                  ) : (
                    <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                  )}
                </Link>
              </button>
            )}
            {isActive && (
              <button
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <Link to="/HomeMedic/Reviews">
                  {open ? (
                    <div className={style.divbutton}>
                      {path.endsWith("/HomeMedic/Reviews") ? (
                        <RateReviewIcon />
                      ) : (
                        <RateReviewIcon style={{ color: "#c2c1c1" }} />
                      )}
                      <p>Reviews</p>
                    </div>
                  ) : path.endsWith("/HomeMedic/Reviews") ? (
                    <RateReviewIcon />
                  ) : (
                    <RateReviewIcon style={{ color: "#c2c1c1" }} />
                  )}
                </Link>
              </button>
            )}
          </Stack>
          <button
            style={{
              width: open ? "9vw" : "2vw",
              border: "none",
              borderRadius: "0  1rem 1rem 0",
              backgroundColor: "#307196",
            }}
            type="button"
            onClick={(e) => handleLogOut(e)}
          >
            <Link>
              {open ? (
                <div
                  className={style.divbutton}
                  style={{ color: "white", height: "3vh" }}
                >
                  <LogoutIcon />
                  Logout
                </div>
              ) : (
                <LogoutIcon
                  style={{ color: "white", alignContent: "center" }}
                />
              )}
            </Link>
          </button>
        </Stack>
      </div>
    </div>
  );
};
export default SideBar;
