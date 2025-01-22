import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useStyle } from "./useStyle";

const NewConversation = ({ onAddConversation }) => {
  const { styles } = useStyle();

  return (
    <Button
      onClick={onAddConversation}
      type="link"
      className={styles.addBtn}
      icon={<PlusOutlined />}
    >
      New Conversation
    </Button>
  );
};

export default NewConversation;
