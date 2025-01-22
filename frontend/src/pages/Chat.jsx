import React, { useEffect, useState } from "react";
import { useXAgent, useXChat } from "@ant-design/x";
import { useStyle } from "./useStyle";
import { defaultConversationsItems, roles } from "./constants";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import axios from 'axios';

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

  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent("");
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

  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === "loading",
    role: status === "local" ? "local" : "ai",
    content: message,
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
