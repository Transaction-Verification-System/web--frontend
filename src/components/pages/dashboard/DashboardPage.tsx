import { useEffect, useState, useRef } from "react";
import RootTemplate from "@/components/templates/root/RootTemplate";
import TokenCopySection from "@/components/molecules/dashboard/TokenCopySection";
import QueueObserver from "@/components/molecules/dashboard/QueueObserver";
import TimeLineObserver from "@/components/molecules/dashboard/TimeLineObserver";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import socket from "@/config/socket";
import { message as antMsg, Modal, Table } from "antd";

// The structure of socket message is here
export interface ISocketMessage {
  verified: boolean;
  message: string;
  response: {
    currentTransactionId: string;
    nextTransactionId: string;
    totalTransactionsChecked: number;
    totalTransactionsLeft: number;
    totalTransactionsAccepted: number;
    totalTransactionsRejected: number;
    percentageOfTransactionsProcessed: number;
    currentProcess: string;
  };
}

/**
 *-----------------------------------------------------------------------------
 * @returns DashboardPage component
 *
 * @description
 * Displays the dashboard page with the token copy section and the queue observer
 *
 *-----------------------------------------------------------------------------
 */
export default function DashboardPage() {
  const [currentSocketMessage, setCurrentSocketMessage] =
    useState<ISocketMessage | null>(null);
  const [connected, setConnected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const clientRef = useRef<W3CWebSocket | null>(null);

  const connectWebSocket = () => {
    const client: W3CWebSocket = socket;
    clientRef.current = client;

    client.onopen = () => {
      console.log("Socket connected");
      antMsg.success("Connection Successful");
      setConnected(true);
    };

    client.onclose = () => {
      console.log("Socket disconnected");
      setConnected(false);
    };

    client.onerror = (error) => {
      console.error("Error connecting socket:", error);
    };

    client.onmessage = (message) => {
      try {
        const rawData = message.data as string;
        const parsedData = JSON.parse(rawData);

        if (parsedData?.message) {
          const innerMessage = parsedData.message;
          const actualData: ISocketMessage = JSON.parse(innerMessage);

          setCurrentSocketMessage(actualData);
          console.log("Message received:", actualData);
        } else {
          console.warn("Message received without 'message' field:", parsedData);
        }
      } catch (error) {
        console.error("Error parsing socket message:", error, message.data);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      clientRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (currentSocketMessage && !currentSocketMessage.verified) {
      const errorMsg = `Transaction ${currentSocketMessage.response.currentTransactionId} failed due to ${currentSocketMessage.message}`;
      antMsg.error(errorMsg);
    }

    if (
      currentSocketMessage &&
      currentSocketMessage.response.percentageOfTransactionsProcessed === 100
    ) {
      setIsModalVisible(true);
    }
  }, [currentSocketMessage]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const transactionsData = currentSocketMessage
    ? [
        {
          key: "1",
          status: "Accepted",
          count: currentSocketMessage.response.totalTransactionsAccepted,
        },
        {
          key: "2",
          status: "Rejected",
          count: currentSocketMessage.response.totalTransactionsRejected,
        },
      ]
    : [];

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <RootTemplate>
      <TokenCopySection />
      {connected && !currentSocketMessage && (
        <div className="flex justify-center items-center h-40 border rounded-md">
          <span>Waiting for data...</span>
        </div>
      )}
      {currentSocketMessage && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border rounded-md">
            <QueueObserver {...currentSocketMessage} />
            <TimeLineObserver {...currentSocketMessage.response} />
          </div>
          <Modal
            title="Transaction Summary"
            open={isModalVisible}
            footer={null}
            onCancel={handleModalClose}
          >
            <Table
              columns={columns}
              dataSource={transactionsData}
              pagination={false}
            />
          </Modal>
        </div>
      )}
    </RootTemplate>
  );
}
