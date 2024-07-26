import { useQuery } from "@tanstack/react-query";
import {
  Skeleton,
  Alert,
  Table,
  Layout,
  Typography,
  Divider,
  Button,
  Input,
  Badge,
} from "antd";
import axiosInstance from "@/utils/axiosInstance";
import RootTemplate from "@/components/templates/root/RootTemplate";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as XLSX from "xlsx";

const { Content } = Layout;
const { Title } = Typography;

export default function PassedTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["passedTransactions"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/history/`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Layout style={{ padding: "20px" }}>
        <Content>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Content>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout style={{ padding: "20px" }}>
        <Content>
          <Alert
            message="Error"
            description={(error as Error).message}
            type="error"
            showIcon
          />
        </Content>
      </Layout>
    );
  }

  const filteredData = data.passed_customer_data.filter((item: any) =>
    item.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const renderBadge = (text:string) => {
    const isTrue = Boolean(text);
  
    const color = isTrue ? 'green' : 'red';
    const displayText = isTrue ? 'True' : 'False';
  
    return (
      <Badge color={color} text={displayText} />
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      sorter: (a: any, b: any) => a.income - b.income,
    },
    {
      title: "Name/Email Similarity",
      dataIndex: "name_email_similarity",
      key: "name_email_similarity",
      sorter: (a: any, b: any) => a.name_email_similarity - b.name_email_similarity,
    },
    {
      title: "Employment Status",
      dataIndex: "employment_status",
      key: "employment_status",
    },
    {
      title: "Credit Risk Score",
      dataIndex: "credit_risk_score",
      key: "credit_risk_score",
      sorter: (a: any, b: any) => a.credit_risk_score - b.credit_risk_score,
    },
    {
      title: "Transaction Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Money Laundering Risk",
      dataIndex: "aml_risk",
      key: "aml_risk",
      render: (text: any) => renderBadge(text),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Link to={`/logs/passed-transactions/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Passed Transactions");
    XLSX.writeFile(workbook, "passed_transactions.xlsx");
  };

  return (
    <RootTemplate>
      <Layout className="py-20 px-5 rounded-xl bg-gray-50">
        <Content>
          <Title level={2} className="text-center mb-8">
            Passed Transactions
          </Title>
          <Divider />

          <Input
            placeholder="Search by Reason"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          
          <Button
            type="primary"
            onClick={handleDownload}
            className="mb-4"
          >
            Download Transactions
          </Button>
          
          <div className="overflow-auto rounded-lg">
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              bordered
              size="middle"
              className="bg-white"
              rowClassName={(_, index) =>
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }
            />
          </div>
        </Content>
      </Layout>
    </RootTemplate>
  );
}
