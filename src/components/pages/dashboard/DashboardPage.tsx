import { useEffect } from "react";
import RootTemplate from "@/components/templates/root/RootTemplate";
import TokenCopySection from "@/components/molecules/dashboard/TokenCopySection";
import QueueObserver from "@/components/molecules/dashboard/QueueObserver";
import TimeLineObserver from "@/components/molecules/dashboard/TimeLineObserver";
import socket from "@/config/socket";

/**
 *-----------------------------------------------------------------------------
 * @returns DashboardPage component
 *
 * @description
 * displays the dashboard page
 * with the token copy section
 * and the queue observer
 *
 *-----------------------------------------------------------------------------
 */
export default function DashboardPage() {
  useEffect(() => {
    socket.onopen = () => {
      console.log("socket connected");
    };
  }, []);

  return (
    <RootTemplate>
      <TokenCopySection />
      <div className=" flex justify-between items-center border rounded-md ">
        <QueueObserver />
        <TimeLineObserver />
      </div>
    </RootTemplate>
  );
}
