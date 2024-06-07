import { LoadingOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const TimelineRecorder = () => {
  return (
    <div className="flex flex-col gap-5 p-10 border-l">
      <span className="text-sm border rounded-md p-2 bg-gray-100">
        <strong>Current Transaction ID:</strong>{" "}
        0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db
      </span>
      <Timeline>
        <Timeline.Item color="blue">
          Checking Reputation List
          <p className="text-xs text-gray-500">
            Ensuring the entity's credibility by cross-referencing with known
            reputation sources.
          </p>
        </Timeline.Item>
        <Timeline.Item dot={<LoadingOutlined />} color="green">
          Rules Engine Weight Calculation
          <p className="text-xs text-gray-500">
            Applying various rules to calculate the weight of the transaction
            parameters.
          </p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          Prediction via AI
          <p className="text-xs text-gray-500">
            Using AI algorithms to predict the outcome based on the calculated
            weights.
          </p>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default TimelineRecorder;
