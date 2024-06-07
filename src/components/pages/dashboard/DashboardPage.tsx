import ApiTokenSection from "@/components/molecules/dashboard/ApiTokenSection";
import RootTemplate from "@/components/templates/root/RootTemplate";
import TimelineRecorder from "@/components/molecules/dashboard/TimelineRecorder";

export default function DashboardPage() {
  return (
    <RootTemplate>
      <ApiTokenSection />
      <div className=" flex justify-end items-center border rounded-md ">
        <TimelineRecorder />
      </div>
    </RootTemplate>
  );
}
