import RootTemplate from "@/components/templates/root/RootTemplate";
import TokenCopySection from "@/components/molecules/dashboard/TokenCopySection";
import QueueObserver from "@/components/molecules/dashboard/QueueObserver";
import TimeLineObserver from "@/components/molecules/dashboard/TimeLineObserver";

/**
 *-----------------------------------------------------------------------------
 * @returns DashboardPage component
 *
 * @description
 * displays the dashboard page
 * with the token copy section
 * and the queue observer
 *-----------------------------------------------------------------------------
 */
export default function DashboardPage() {
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
