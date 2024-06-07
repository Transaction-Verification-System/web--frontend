import { Input, Tooltip, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

/**
 *-----------------------------------------------------------------------------
 * @returns TokenCopySection component
 *
 * @description
 * displays a token copy section
 * with a copy button that copies the token to the clipboard
 *-----------------------------------------------------------------------------
 */
const TokenCopySection = () => {
  const clipboardContent = "123456";

  const copyLink = () => {
    navigator.clipboard.writeText(clipboardContent);
    message.success("Copied to clipboard");
  };

  return (
    <div className=" border rounded-md min-h-48 flex justify-center items-center p-10 ">
      <div className="relative w-1/2 p-0">
        <Input
          value={`API Token: ${clipboardContent}`}
          className=" w-full hover:cursor-default disabled:text-black"
          disabled
        />

        <Tooltip title="Copy Token">
          <span
            onClick={copyLink}
            className=" absolute cursor-pointer top-0 rounded-r-lg right-0 w-1/12 h-full border bg-white flex justify-center items-center"
          >
            <CopyOutlined />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default TokenCopySection;
