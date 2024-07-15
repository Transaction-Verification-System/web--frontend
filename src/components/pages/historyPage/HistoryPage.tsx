import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin, Alert } from "antd";

const URL = import.meta.env.VITE_API_URL;

export default function TransactionsHistoryPage() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axios.get(`${URL}/transaction/`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Spin tip="Loading transactions..." />;
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
