import React from "react";
import { useStyle } from "./useStyle";

const LogoNode = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.logo}>
      <img
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
      />
      <span>GPT Design X</span>
    </div>
  );
};

export default LogoNode;
