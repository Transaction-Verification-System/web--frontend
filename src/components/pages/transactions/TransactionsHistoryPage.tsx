import { useQuery } from "@tanstack/react-query";
import { Skeleton, Alert } from "antd";
import axiosInstance from "@/utils/axiosInstance";

export default function TransactionsHistoryPage() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/history/`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description={(error as Error).message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      {data &&
        data.map((transaction: any) => (
          <div key={transaction.id}>
            {/* Render your transaction data here */}
            <p>{transaction.description}</p>
          </div>
        ))}
    </div>
  );
}
