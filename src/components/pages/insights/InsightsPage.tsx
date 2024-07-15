import RootTemplate from "@/components/templates/root/RootTemplate";
import { Card, Col, Row, Statistic, Typography, Table } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const { Title } = Typography;

// Dummy data for insights and visualizations
const dummyInsightsData = [
  {
    key: "1",
    title: "Total Transactions",
    value: 1500,
  },
  {
    key: "2",
    title: "Successful Transactions",
    value: 1450,
  },
  {
    key: "3",
    title: "Failed Transactions",
    value: 50,
  },
  {
    key: "4",
    title: "Pending Transactions",
    value: 10,
  },
];

const transactionDetails = [
  {
    key: "1",
    transactionId: "TX12345",
    status: "Accepted",
    timestamp: "2024-07-15 10:00",
  },
  {
    key: "2",
    transactionId: "TX12346",
    status: "Rejected",
    timestamp: "2024-07-15 10:05",
  },
  {
    key: "3",
    transactionId: "TX12347",
    status: "Pending",
    timestamp: "2024-07-15 10:10",
  },
];

const columns = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
];

// Pie Chart data
const pieData = [
  { name: "Accepted", value: 1450 },
  { name: "Rejected", value: 50 },
  { name: "Pending", value: 10 },
];

// Bar Chart data
const barData = [
  { name: "Jan", Transactions: 300 },
  { name: "Feb", Transactions: 500 },
  { name: "Mar", Transactions: 200 },
  { name: "Apr", Transactions: 400 },
];

export default function InsightsPage() {
  return (
    <RootTemplate>
      <div style={{ padding: "24px" }}>
        <Title level={2}>Insights Dashboard</Title>
        <Row gutter={16}>
          {dummyInsightsData.map((insight) => (
            <Col span={6} key={insight.key}>
              <Card>
                <Statistic title={insight.title} value={insight.value} />
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={16} style={{ marginTop: "24px" }}>
          <Col span={12}>
            <Card title="Transaction Status Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#4CAF50", "#FF9800", "#F44336"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Monthly Transaction Trend">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="Transactions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "24px" }}>
          <Title level={4}>Most Recent Transactions</Title>
          <Table
            columns={columns}
            dataSource={transactionDetails}
            pagination={false}
          />
        </div>
      </div>
    </RootTemplate>
  );
}
