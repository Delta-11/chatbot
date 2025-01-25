import React from "react";
import { Space } from "antd";
import { Welcome } from "@ant-design/x";
import { useStyle } from "./useStyle";

const PlaceholderNode = ({ onPromptsItemClick }) => {
  const { styles } = useStyle();

  return (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Hello, I'm Intelligent Assistant"
        description="I can help in many ways. Try to ask me something."
      />
    </Space>
  );
};

export default PlaceholderNode;
