import { LoadingOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const TimelineRecorder = () => {
  return (
    <Timeline
      items={[
        {
          children: "Checking Reputition list",
          color: "blue",
        },
        {
          children: "Rules engiene",
          dot: <LoadingOutlined />,
          color: "green",
        },
        {
          children: "Unsupervised prediction model",
          color: "gray",
        },
      ]}
    />
  );
};

export default TimelineRecorder;
