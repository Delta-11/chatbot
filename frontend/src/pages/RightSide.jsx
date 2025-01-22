import React from "react";
import { Bubble } from "@ant-design/x";
import PlaceholderNode from "./PlaceholderNode";
import SenderComp from "./SenderComp";
import { useStyle } from "./useStyle";

const RightSide = ({
  items,
  roles,
  content,
  setContent,
  onSubmit,
  headerOpen,
  setHeaderOpen,
  attachedFiles,
  handleFileChange,
  agent,
}) => {
  const { styles } = useStyle();

  return (
    <div className={styles.chat}>
      <Bubble.List
        items={
          items.length > 0
            ? items
            : [
                {
                  content: <PlaceholderNode />,
                  variant: "borderless",
                },
              ]
        }
        roles={roles}
        className={styles.messages}
      />
      <SenderComp
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

export default RightSide;
