import React from "react";
import { Sender } from "@ant-design/x";
import AttachmentsComp from "./AttachmentsComp";
import { useStyle } from "./useStyle";

const SenderComp = ({
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
  const { attachmentsNode, senderHeader } = AttachmentsComp({
    headerOpen,
    setHeaderOpen,
    attachedFiles,
    handleFileChange,
  });

  return (
    <Sender
      value={content}
      header={senderHeader}
      onSubmit={onSubmit}
      onChange={setContent}
      prefix={attachmentsNode}
      loading={agent.isRequesting()}
      className={styles.sender}
    />
  );
};

export default SenderComp;
