import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Button, Typography, Divider, Spin, Modal, Input, Form } from "antd";
import RootTemplate from "@/components/templates/root/RootTemplate";

const { Title, Text } = Typography;

export default function TransactionsDetailsPage() {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["transactionDetail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/history/detail/${id}/`);
      return response.data;
    },
  });

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

  const handleReportSubmit = async () => {
    // Here you can handle the report submission
    console.log("Reported Message:", reportMessage);
    setIsModalVisible(false);
    // Reset the report message
    setReportMessage("");
    // Optionally, send reportMessage to the server
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
                <Text strong>Transaction ID:</Text> <Text>{transaction.id}</Text>
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
                <Text strong>Housing Status:</Text> <Text>{transaction.housing_status}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Phone Validity:</Text>{" "}
                <Text>{transaction.phone_home_valid ? "Valid" : "Invalid"}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Device OS:</Text> <Text>{transaction.device_os}</Text>
              </div>
              <div className="mb-4">
                <Text strong>Days Since Request:</Text> <Text>{transaction.days_since_request}</Text>
              </div>
              <div className="mb-6">
                <Text strong>Status:</Text>{" "}
                <Text className={transaction.verified ? "text-green-500" : "text-red-500"}>
                  {transaction.verified ? "Verified" : "Not Verified"}
                </Text>
              </div>
              <Button type="primary" className="w-full" onClick={() => setIsModalVisible(true)}>
                Report Transaction
              </Button>
            </>
          )}
        </div>
      </div>

      <Modal
        title="Report Transaction"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleReportSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Message" required>
            <Input.TextArea
              rows={4}
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              placeholder="Enter your message here..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </RootTemplate>
  );
}
