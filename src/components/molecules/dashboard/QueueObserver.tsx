import { ISocketMessage } from "@/components/pages/dashboard/DashboardPage";
import { Progress } from "antd";

/**
 * ------------------------------------------------------------------------------
 * @returns QueueObserver component
 *
 * @description
 * displays a queue observer section
 * with the current transaction ID, next transaction ID, total transactions checked, total transactions left, total transactions accepted, total transactions rejected, and percentage of transactions processed
 * ------------------------------------------------------------------------------
 */
const QueueObserver = ({
  response: {
    currentTransactionId,
    nextTransactionId,
    totalTransactionsChecked,
    totalTransactionsLeft,
    totalTransactionsAccepted,
    totalTransactionsRejected,
    percentageOfTransactionsProcessed,
  },
}: ISocketMessage) => {
  return (
    <div className="p-4 w-1/2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2">
          <div className="text-sm font-semibold">Current Transaction ID</div>
          <code className="text-lg">{currentTransactionId}</code>
        </div>
        <div className="p-2">
          <div className="text-sm font-semibold">Next Transaction ID</div>
          <code className="text-lg">{nextTransactionId}</code>
        </div>
        <div className="p-2">
          <div className="text-sm font-semibold">Total Transactions Checked</div>
          <div className="text-lg">{totalTransactionsChecked}</div>
        </div>
        <div className="p-2">
          <div className="text-sm font-semibold">Total Transactions Left</div>
          <div className="text-lg">{totalTransactionsLeft}</div>
        </div>
        <div className="p-2">
          <div className="text-sm font-semibold">Total Transactions Accepted</div>
          <div className="text-lg">{totalTransactionsAccepted}</div>
        </div>
        <div className="p-2">
          <div className="text-sm font-semibold">Total Transactions Rejected</div>
          <div className="text-lg">{totalTransactionsRejected}</div>
        </div>
        <div className="p-2 col-span-1 md:col-span-2">
          <div className="text-sm font-semibold">
            Percentage of Transactions Processed
          </div>
          <div className="text-lg">{percentageOfTransactionsProcessed} %</div>
          <Progress percent={percentageOfTransactionsProcessed} status="active" />
        </div>
      </div>
    </div>
  );
};

export default QueueObserver;
