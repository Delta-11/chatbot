import React, { useEffect, useState } from "react";
import { useXAgent, useXChat } from "@ant-design/x";
import { useStyle } from "./useStyle";
import { defaultConversationsItems, roles } from "./constants";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import axios from "axios";

const apiEndpoint = import.meta.env.VITE_BACKEND_URL + "/chat";

const Chat = () => {
  const { styles } = useStyle();
  const [headerOpen, setHeaderOpen] = useState(false);
  const [content, setContent] = useState("");
  const [conversationsItems, setConversationsItems] = useState(defaultConversationsItems);
  const [activeKey, setActiveKey] = useState(defaultConversationsItems[0].key);
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess }) => {
      onSuccess(`Mock success return. You said: ${message}`);
    },
  });
  const { onRequest, messages, setMessages } = useXChat({ agent });

  // Clear messages when switching conversations
  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // Helper function to deduplicate and format messages
  const formatMessages = (chatResponse, existingMessages) => {
    const newMessages = chatResponse
      .map(({ role, content }) => ({
        role: role === "user" ? "local" : "ai", // Map roles for UI
        content: content.map((item) => ({
          type: item.type,
          text: item.text,
        })),
      }))
      .filter(
        (newMessage) =>
          !existingMessages.some(
            (existing) =>
              existing.role === newMessage.role &&
              existing.content.map((c) => c.text).join(" ") ===
                newMessage.content.map((c) => c.text).join(" ")
          )
      );
    return newMessages;
  };

  const onSubmit = async (nextContent) => {
    if (!nextContent) return;

    try {
      const chatHistory = messages.map(({ role, content }) => ({
        role: role === "local" ? "user" : "assistant",
        content: content.map((item) => ({
          type: item.type,
          text: item.text,
        })),
      }));

      const requestPayload = {
        role: "user",
        systemPrompt: "",
        encodedImage: "",
        userPrompt: nextContent,
        chatHistory,
      };

      const response = await axios.post(apiEndpoint, requestPayload);
      const chatResponse = response.data.response;

      // Deduplicate and update messages
      const newMessages = formatMessages(chatResponse, messages);
      setMessages([...messages, ...newMessages]);
    } catch (error) {
      console.error("Error during message submission:", error);
    }

    setContent(""); // Clear the input field
  };

  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `New Conversation ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };

  const onConversationClick = (key) => {
    setActiveKey(key);
  };

  const handleFileChange = (info) => setAttachedFiles(info.fileList);

  const items = messages.map(({ role, content }) => ({
    key: Math.random().toString(36).substr(2, 9),
    loading: false,
    role,
    content: Array.isArray(content)
      ? content.map((item) => item.text).join(" ")
      : content || "",
  }));

  return (
    <div className={styles.layout}>
      <LeftSide
        conversationsItems={conversationsItems}
        activeKey={activeKey}
        onAddConversation={onAddConversation}
        onConversationClick={onConversationClick}
      />
      <RightSide
        items={items}
        roles={roles}
        content={content}
        setContent={setContent}
        onSubmit={onSubmit}
        headerOpen={headerOpen}
        setHeaderOpen={setHeaderOpen}
        attachedFiles={attachedFiles}
        handleFileChange={handleFileChange}
        agent={agent}
      />
    </div>
  );
};

export default Chat;
