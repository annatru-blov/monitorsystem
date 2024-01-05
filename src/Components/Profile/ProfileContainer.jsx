import Profile from "./Profile";
import { connect } from "react-redux";
import { setProfileData } from "./../../redux/profile-reducer";

let mapStateToProps = (state) => {
  return {
    middleName: state.profilePage.middleName,
    mobileNumber: state.profilePage.mobileNumber,
    login: state.profilePage.login,
    email: state.profilePage.email,
    firstName: state.profilePage.firstName,
    surname: state.profilePage.surname,
    identificationNumber: state.profilePage.identificationNumber,
    password: state.profilePage.password,
    newPassword: state.profilePage.newPassword,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setProfileData: (userData) => {
      dispatch(setProfileData(userData));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
