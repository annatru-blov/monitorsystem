const SET_PROFILE_DATA = "SET_PROFILE_DATA";

interface ProfileState {
  firstName: string;
  surname: string;
  middleName: string;
  identificationNumber: string;
  login: string;
  email: string;
  mobileNumber: string;
  password: string;
  newPassword: string;
}

interface SetProfileDataAction {
  type: typeof SET_PROFILE_DATA;
  payload: ProfileState;
}

let initialState: ProfileState = {
  firstName: "",
  surname: "",
  middleName: "",
  identificationNumber: "",
  login: "",
  email: "",
  mobileNumber: "",
  password: "",
  newPassword: "",
};

const profileReducer = (state = initialState, action: SetProfileDataAction) => {
  switch (action.type) {
    case "SET_PROFILE_DATA":
      return {
        ...state,
        login: action.payload.login,
        firstName: action.payload.firstName,
        surname: action.payload.surname,
        password: action.payload.password,
        middleName: action.payload.middleName,
        identificationNumber: action.payload.identificationNumber,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        newPassword: action.payload.newPassword, 
      };

    default:
      return state;
  }
};

export const setProfileData = (
  userData: ProfileState
): SetProfileDataAction => ({
  type: "SET_PROFILE_DATA",
  payload: userData,
});

export default profileReducer;
