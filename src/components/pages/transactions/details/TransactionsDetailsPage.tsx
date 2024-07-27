import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Divider, Spin, Modal, message } from "antd";
import RootTemplate from "@/components/templates/root/RootTemplate";

const { Title, Text } = Typography;

export default function PassedTransactionsDetailsPage() {
  const { id } = useParams();
  const [, setReportMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { pathname } = useLocation();
  const URI = pathname.split("/")[2];

  const apiURI =
    URI === "passed-transactions"
      ? `/passed/detail/${id}`
      : `/failed/detail/${id}`;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["transactionDetail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(apiURI);
      return response.data;
    },
  });

  const { mutate: makeTransactionPassed } = useMutation({
    mutationKey: ["makeTransactionPassed"],
    mutationFn: async () => {
      const response = await axiosInstance.post(`/failed/detail/${id}/`);
      return response.data;
    },
    onError: () => {
      message.error("Error updating transaction");
    },
    onSuccess: () => {
      message.success("Transaction successfully updated");
      setReportMessage("");
    },
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text type="danger">Error: {(error as Error).message}</Text>
      </div>
    );
  }

  const transaction = data?.["Customer Data"];

  const handleReportSubmit = () => {
    Modal.confirm({
      title: "Confirm Action",
      content:
        "This action is irreversible. Please ensure that this transaction is actually verified before proceeding.",
      okText: "Yes, Proceed",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setIsSubmitting(true);
        try {
          await makeTransactionPassed();
          navigate(`/logs/passed-transactions/${id}`);
        } catch (err) {
          console.error("Error updating transaction:", err);
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <RootTemplate>
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-6 max-w-2xl w-2/3 bg-white rounded-lg shadow-lg border">
          <Title level={2} className="text-center mb-4">
            Transaction Details
          </Title>
          <Divider />
          {transaction && (
            <>
              <div className="mb-4">
                <Text strong>Transaction ID:</Text>{" "}
                <Text>{transaction.id}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Income:</Text> <Text>${transaction.income}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Credit Risk Score:</Text>{" "}
                <Text>{transaction.credit_risk_score}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Employment Status:</Text>{" "}
                <Text>{transaction.employment_status}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Reason:</Text> <Text>{transaction.reason}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Housing Status:</Text>{" "}
                <Text>{transaction.housing_status}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Phone Validity:</Text>{" "}
                <Text>
                  {transaction.phone_home_valid ? "Valid" : "Invalid"}
                </Text>
              </div>
              <div className="mb-4">
                <Text strong>Device OS:</Text>{" "}
                <Text>{transaction.device_os}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Days Since Request:</Text>{" "}
                <Text>{transaction.days_since_request}</Text>
              </div>

              <div className="mb-6">
                <Text strong>Money Laundering Risk:</Text>{" "}
                <Text
                  className={
                    !transaction.aml_risk ? "text-green-500" : "text-red-500"
                  }
                >
                  {transaction.aml_risk ? "Risky" : "Not Risky"}
                </Text>
              </div>

              <div className="mb-6">
                <Text strong>Status:</Text>{" "}
                <Text
                  className={
                    transaction.verified ? "text-green-500" : "text-red-500"
                  }
                >
                  {transaction.verified ? "Verified" : "Not Verified"}
                </Text>
              </div>
              {!transaction.verified && (
                <Button
                  type="primary"
                  className="w-full"
                  key="submit"
                  loading={isSubmitting}
                  onClick={handleReportSubmit}
                >
                  Make Transaction Passed
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </RootTemplate>
  );
}
