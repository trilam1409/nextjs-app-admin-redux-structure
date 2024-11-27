import { createAppSlice } from "@/redux/createAppSlice";
import axiosInstance from "@/services/client-request/axios-instance";

export interface UserType {
  avatar: string;
  name: string;
  id: string;
}

export interface UserSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
  userInfo: UserType | null;
}

const initialState: UserSliceState = {
  value: 0,
  status: "idle",
  userInfo: null,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const accountSlice = createAppSlice({
  name: "account",
  initialState,
  reducers: (create) => ({
    getUserInfo: create.asyncThunk(
      async () => {
        const { data } = await axiosInstance.get(
          "https://run.mocky.io/v3/a42d23ee-1c10-4fbe-9301-07c93764b0e6",
        );
        // The value we return becomes the `fulfilled` action payload
        return data;
      },
      {
        fulfilled: (state, action) => {
          state.userInfo = action.payload;
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUserInfo: (home) => home.userInfo,
  },
});

// Action creators are generated for each case reducer function.
export const { getUserInfo } = accountSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserInfo } = accountSlice.selectors;
