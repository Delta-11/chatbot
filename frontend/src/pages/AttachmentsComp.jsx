import React from "react";
import { Badge, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { Attachments, Sender } from "@ant-design/x";

const AttachmentsComp = ({
  headerOpen,
  setHeaderOpen,
  attachedFiles,
  handleFileChange,
}) => {
  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button
        type="text"
        icon={<PaperClipOutlined />}
        onClick={() => setHeaderOpen(!headerOpen)}
      />
    </Badge>
  );

  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === "drop"
            ? {
                title: "Drop file here",
              }
            : {
                icon: <PaperClipOutlined />,
                title: "Upload files",
                description: "Click or drag files to this area to upload",
              }
        }
      />
    </Sender.Header>
  );

  return { attachmentsNode, senderHeader };
};

export default AttachmentsComp;
