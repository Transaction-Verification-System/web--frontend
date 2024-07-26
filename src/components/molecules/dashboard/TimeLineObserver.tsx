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
  currentProcess: string; 
}

const TimeLineObserver = ({
  currentTransactionId,
  currentProcess
}: ISocketMessage) => {

  const processSteps = ["black_list", "rules_engine", "ai_model"];

  const isStepCompleted = (step: string) => {
    const currentIndex = processSteps.indexOf(currentProcess);
    return processSteps.indexOf(step) < currentIndex;
  };

  const getDot = (processName: string) => {
    if (currentProcess === processName) {
      return <LoadingOutlined />;
    } else if (isStepCompleted(processName)) {
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
          color={currentProcess === "black_list" ? "blue" : isStepCompleted("black_list") ? "green" : "gray"}
        >
          Checking Reputation List
          <p className="text-xs text-gray-500">
            Ensuring the entity's credibility by cross-referencing with known
            reputation sources.
          </p>
        </Timeline.Item>
        <Timeline.Item
          dot={getDot("rules_engine")}
          color={currentProcess === "rules_engine" ? "blue" : currentProcess === "ai_model" ? "green" : isStepCompleted("rules_engine") ? "green" : "gray"}
        >
          Rules Engine Weight Calculation
          <p className="text-xs text-gray-500">
            Applying various rules to calculate the weight of the transaction
            parameters.
          </p>
        </Timeline.Item>
        <Timeline.Item
          dot={getDot("ai_model")}
          color={currentProcess === "ai_model" ? "blue" : currentProcess === "completed" ? "green" : isStepCompleted("ai_model") ? "green" : "gray"}
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