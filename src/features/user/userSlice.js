import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
    );
  });
}

//1.create the Thunk
//params: 1. pass the action name; 2. pass an asyn function that will return payload for reducer
//do not call it getAddress cuz that is reserved for useSelector
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    //   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    //   // 3) Then we return an object with the data that we are interested in
    //payload of the fullfilled state
    return { position, address };
  },
);

const initialState = {
  username: " ",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  //2. connect the reducer with Thunk and response the lifecycle of async process ( pending, fullfilled and rejected)
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action) => {
          state.position =
            action.payload.position;
          state.address = action.payload.address;
          state.status = "idle";
        },
      )
      //if the user does not accept Geolocation
      .addCase(
        fetchAddress.rejected,
        (state) => {
          state.status = "error";
          state.error = "Therewas a problem getting your location. Make sure to fill this field.";
        },
      ),
});

export default userSlice.reducer;
export const { updateName } = userSlice.actions;
