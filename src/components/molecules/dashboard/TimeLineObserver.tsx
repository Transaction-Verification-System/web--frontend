import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

interface ISocketMessage {
  currentTransactionId: string;
  nextTransactionId: string;
  totalTransactionsChecked: number;
  totalTransactionsLeft: number;
  totalTransactionsAccepted: number;
  totalTransactionsRejected: number;
  percentageOfTransactionsProcessed: number;
  currentProcess: string; // Assuming this is part of the response
}

const TimeLineObserver = ({
  currentTransactionId,
  currentProcess
}: ISocketMessage) => {

  const getDot = (processName: string) => {
    if (currentProcess === processName) {
      return <LoadingOutlined />;
    } else if (
      (processName === "black_list" && currentProcess !== "black_list") ||
      (processName === "rules_engine" && (currentProcess === "rules_engine" || currentProcess === "ai_prediction"))
    ) {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 p-10 border-l">
      <span className="text-sm border rounded-md p-2 bg-gray-100">
        <strong>Current Transaction ID:</strong> {currentTransactionId}
      </span>
      <Timeline>
        <Timeline.Item
          dot={getDot("black_list")}
          color={currentProcess === "black_list" ? "blue" : "gray"}
        >
          Checking Reputation List
          <p className="text-xs text-gray-500">
            Ensuring the entity's credibility by cross-referencing with known
            reputation sources.
          </p>
        </Timeline.Item>
        <Timeline.Item
          dot={getDot("rules_engine")}
          color={currentProcess === "rules_engine" ? "blue" : currentProcess === "ai_prediction" ? "green" : "gray"}
        >
          Rules Engine Weight Calculation
          <p className="text-xs text-gray-500">
            Applying various rules to calculate the weight of the transaction
            parameters.
          </p>
        </Timeline.Item>
        <Timeline.Item
          dot={currentProcess === "ai_prediction" ? <LoadingOutlined /> : currentProcess === "completed" ? <CheckCircleOutlined style={{ color: "green" }} /> : null}
          color={currentProcess === "ai_prediction" ? "blue" : currentProcess === "completed" ? "green" : "gray"}
        >
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

export default TimeLineObserver;
