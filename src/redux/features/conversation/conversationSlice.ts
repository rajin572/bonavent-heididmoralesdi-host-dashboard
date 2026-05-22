/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IConversation } from "../../../types/conversation.type";

// Define types for each part of the state

interface ConversationState {
  onlineUser: any;
  typingUser: boolean;
  selectedChatUser: IConversation | null;
  chatMessages: any;
}

// Initial state
const initialState: ConversationState = {
  onlineUser: [],
  typingUser: false,
  selectedChatUser: null,
  chatMessages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<any[]>) => {
      console.log(action);
      if (action.payload) {
        state.onlineUser = [...state.onlineUser, ...action.payload];
      }
    },
    removeOnlineUser: (state, action: PayloadAction<string>) => {
      state.onlineUser = state.onlineUser.filter(
        (user: string) => user !== action.payload,
      );
    },
    setTypingUser: (state, action: PayloadAction<boolean>) => {
      state.typingUser = action.payload;
    },
    setSelectedChatUser: (
      state,
      action: PayloadAction<IConversation | null>,
    ) => {
      state.selectedChatUser = action.payload;
    },
    clearSelectedChatUser: (state) => {
      state.selectedChatUser = null;
    },
    setChatMessages: (state, action: PayloadAction<any[]>) => {
      state.chatMessages = action.payload;
    },
  },
});

// Action creators
export const {
  setOnlineUsers,
  removeOnlineUser,
  setTypingUser,
  setSelectedChatUser,
  clearSelectedChatUser,
  setChatMessages,
} = conversationSlice.actions;

// Selectors
export const selectOnlineUsers = (state: RootState) =>
  state.conversation.onlineUser;
export const selectTypingUser = (state: RootState) =>
  state.conversation.typingUser;
export const selectSelectedChatUser = (state: RootState) =>
  state.conversation.selectedChatUser;
export const selectChatMessages = (state: RootState) =>
  state.conversation.chatMessages;

// Export reducer
export default conversationSlice.reducer;
