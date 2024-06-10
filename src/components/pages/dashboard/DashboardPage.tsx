import RootTemplate from "@/components/templates/root/RootTemplate";
import TokenCopySection from "@/components/molecules/dashboard/TokenCopySection";
import QueueObserver from "@/components/molecules/dashboard/QueueObserver";
import TimeLineObserver from "@/components/molecules/dashboard/TimeLineObserver";
import socket from "@/config/socket";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Localstore from "@/config/localstore";

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/verify/",
        {},
        {
          method: "POST",
          headers: {
            Authorization: "Token " + Localstore.getAccessToken(),
          },
        }
      );

      return res.data();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: </div>;

  console.log("api response data ", data);

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
