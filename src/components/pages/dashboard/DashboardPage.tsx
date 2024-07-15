import { useEffect, useState } from "react";
import RootTemplate from "@/components/templates/root/RootTemplate";
import TokenCopySection from "@/components/molecules/dashboard/TokenCopySection";
import QueueObserver from "@/components/molecules/dashboard/QueueObserver";
import TimeLineObserver from "@/components/molecules/dashboard/TimeLineObserver";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import socket from "@/config/socket";
import { message as antMsg } from "antd";

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

  useEffect(() => {
    const client: W3CWebSocket = socket;

    client.onopen = () => {
      console.log("socket connected");
    };

    client.onclose = () => {
      console.log("socket disconnected");
    };

    client.onerror = (error) => {
      console.log("error connecting socket:", error);
    };

    client.onmessage = (message) => {
      try {
        const rawData = message?.data as string;
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
        console.error("Error parsing socket message:", error, message?.data);
      }
    };

    return () => {
      client.close();
    };
  }, []);

  useEffect(() => {
    console.log("currentSocketMessage", currentSocketMessage);

    if (!currentSocketMessage?.verified) {
      const errorMsg = `Transaction ${currentSocketMessage?.response.currentTransactionId} failed due to  ${currentSocketMessage?.message}`;
      antMsg.error(errorMsg);
    }
  }, [currentSocketMessage]);

  return (
    <RootTemplate>
      <TokenCopySection />
      {currentSocketMessage && (
        <div className="flex justify-between items-center border rounded-md">
          <QueueObserver {...currentSocketMessage} />
          <TimeLineObserver
            currentProcess={currentSocketMessage.response.currentProcess}
          />
        </div>
      )}
    </RootTemplate>
  );
}
