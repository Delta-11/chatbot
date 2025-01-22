import React, { useState } from "react";
import { Layout } from "antd";
import { Conversations } from "@ant-design/x";
import LogoNode from "./LogoNode";
import NewConversation from "./NewConversation";
import { useStyle } from "./useStyle";

const { Sider } = Layout;

const LeftSide = ({
  conversationsItems,
  activeKey,
  onAddConversation,
  onConversationClick,
}) => {
  const { styles } = useStyle();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className={styles.sider}
      collapsedWidth={200}
      width={300}
    >
      <LogoNode />
      <NewConversation onAddConversation={onAddConversation} />
      <Conversations
        items={conversationsItems}
        className={styles.conversations}
        activeKey={activeKey}
        onActiveChange={onConversationClick}
      />
    </Sider>
  );
};

export default LeftSide;
