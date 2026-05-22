/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "antd";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeOnlineUser,
  selectSelectedChatUser,
  setOnlineUsers,
} from "../../redux/features/conversation/conversationSlice";
import { useSocket } from "../../context/socket-context";
import { IConversation } from "../../types/conversation.type";

const ConversationChatList = ({ userData, onlineUsers }: any) => {
  const socket = useSocket()?.socket;
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useAppSelector(selectSelectedChatUser);
  const [chatList, setChatList] = useState<IConversation[]>([]);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {},
      {
        skip: !userData?.userId,
        refetchOnMountOrArgChange: true,
      }
    );

  const handleNewMessage = useCallback((message: any) => {
    console.log(message)
    // socket payload fields
    const chatId = message?.chatId;
    const senderId = message?.senderId;
    const text = message?.text ?? "";
    const file = message?.file ?? [];
    const userInfo = message?.userInfo;

    if (!chatId) return;

    // Build the chat item in your chat list format
    const formattedChat: IConversation = {
      _id: chatId, // chat document id
      guestId: userInfo?.userId ?? "", // the other user id (as your list expects)
      fullName: userInfo?.fullName ?? "Unknown",
      profileImage: userInfo?.profileImage ?? "",
      lastMessage: {
        text,
        file,
        sender: senderId,
      },
      unreadChatCount: userInfo?.unreadChatCount ?? 0,
      isOnline: false, // keep as-is; your online/offline events will update UI
      updatedAt: userInfo?.updatedAt ?? message?.updatedAt ?? new Date().toISOString(),
      createdAt: userInfo?.createdAt ?? message?.createdAt ?? new Date().toISOString(),
    };

    setChatList((prev) => {
      const index = prev.findIndex((c) => c._id === chatId || c._id === formattedChat._id);

      // If exists -> update + move to top
      if (index !== -1) {
        const updated = [...prev];
        const merged = {
          ...updated[index],
          ...formattedChat,
          // keep current online state from list (don't override)
          isOnline: updated[index].isOnline,
        };

        updated.splice(index, 1); // remove old position
        return [merged, ...updated]; // move to top
      }

      // If new chat -> add to top
      return [formattedChat, ...prev];
    });
  }, []);


  useEffect(() => {
    if (!socket) {
      console.warn("❌ Socket not ready yet.");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.on(`receiveMessage`, (message: any) => {
      handleNewMessage(message);
    });

    socket.on("userOnline", (online: any) => {
      dispatch(setOnlineUsers([online?.userId]));
    });
    socket.on("userOffline", (online: any) => {
      console.log(online)
      dispatch(removeOnlineUser(online?.userId));
    });

    return () => {
      // keep same behavior; just properly detach listeners
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("receiveMessage");
    };
  }, [dispatch, handleNewMessage, socket, userData?.userId]);

  useEffect(() => {
    const onLineUserIds = allChatList?.data?.chats?.filter(
      (chat: IConversation) => chat?.isOnline === true
    )


    dispatch(setOnlineUsers(onLineUserIds?.map((user: IConversation) => user?.guestId)));


    // expecting chats array already in the new IConversation shape
    if (allChatList?.data?.chats) {
      setChatList(allChatList?.data?.chats);
    }
  }, [allChatList?.data?.chats, dispatch]);


  const filteredConversations = useMemo(() => {
    const sorted = chatList
      ?.slice()
      ?.sort((a: IConversation, b: IConversation) => {
        const dateA = new Date(a?.updatedAt || 0).getTime();
        const dateB = new Date(b?.updatedAt || 0).getTime();
        return dateB - dateA;
      });

    const filtered = !searchTerm
      ? sorted
      : sorted?.filter((item: IConversation) => item?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

    return filtered;
  }, [chatList, searchTerm]);

  console.log(chatList)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`w-full lg:w-[400px] border-r-2 border-secondary-color/20 overflow-y-auto px-3 !bg-primary-color ${seletedConversation ? "hidden lg:block" : "block lg:block"
        }`}
    >
      <div className="sticky top-0 z-20  py-5 mb-3">
        <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
          Messages
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className="!bg-[#EFEFEF] text-base-color mt-2 !py-3 !px-2 w-full"
          onChange={handleSearch}
        />
      </div>

      {isAllChatFeacthing ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations?.map((conversation: IConversation) => {
              const imageUrlSrc = conversation?.profileImage;

              return (
                <ConversationChatListCard
                  key={conversation?._id}
                  conversation={conversation}
                  imageUrlSrc={imageUrlSrc}
                  onlineUsers={onlineUsers}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationChatList;
