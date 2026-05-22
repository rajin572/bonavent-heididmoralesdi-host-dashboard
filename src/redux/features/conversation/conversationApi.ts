import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createConversation: build.mutation({
      query: (req) => ({
        url: `/chat/create-or-fetch-chatId`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),
    getConversationList: build.query({
      query: ({ limit = 10000000 }) => {
        return {
          url: `/chat/get-chat-list`,
          method: "GET",
          params: {
            limit,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id, page, limit }) => ({
        url: `/chat/${id}/messages`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetConversationListQuery,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
