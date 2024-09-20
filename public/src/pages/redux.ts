import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Define the interface for the user info
interface UserInfo {
  type: string;
  username: string;
  collegeName: string;
  year: string;
  stars: number;
}

// Define the initial state for the question slice

// Define the initial state structure
interface AuthInitialState {
  userInfo: UserInfo | undefined;
}

const initialState: AuthInitialState = {
  userInfo: {
    type: "",
    username: "Dipesh Mishra",
    collegeName: "Pillai College of Engineering",
    year: "Ty",
    stars: 0,
  },
};

// Create the slice
export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // Define your action with a strongly typed payload
    setUserType: (state, action) => {
      state.userInfo!.type = action.payload.type;
    },
  },
});

interface QuestionState {
  question: string;
  language: string;
}

const initialQuestionState: QuestionState = {
  question: "", // Initial value for the question
  language: "",
};

export const questionSlice = createSlice({
  name: "question",
  initialState: initialQuestionState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload.question; // Set the question with the new value
    },
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

export const { setQuestion, setLanguage } = questionSlice.actions;
export const { setUserType } = userSlice.actions;

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer, // Your existing user slice
    question: questionSlice.reducer, // The new question slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
