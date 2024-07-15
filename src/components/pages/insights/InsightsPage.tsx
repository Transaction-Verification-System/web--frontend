import RootTemplate from "@/components/templates/root/RootTemplate";
import { Card, Col, Row, Typography, Table } from "antd";
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
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import "tailwindcss/tailwind.css";

const { Title } = Typography;

export default function InsightsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["customerData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/history/");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const passedCustomers = data?.passed_customer_data || [];
  const failedCustomers = data?.failed_customer_data || [];

  const transactionDetails = [
    ...passedCustomers.map((customer: any) => ({
      transactionId: `TX-${customer.id}`,
      status: "Passed",
      timestamp: new Date().toISOString(),
    })),
    ...failedCustomers.map((customer: any) => ({
      transactionId: `TX-${customer.id}`,
      status: "Failed",
      timestamp: new Date().toISOString(),
    })),
  ].slice(0, 5);

  const totalPassed = passedCustomers.length;
  const totalFailed = failedCustomers.length;

  const pieData = [
    { name: "Passed", value: totalPassed },
    { name: "Failed", value: totalFailed },
  ];

  // Prepare income range data for passed and failed with better spread
  const incomeRanges = [
    { range: "<20K", countPassed: 0, countFailed: 0 },
    { range: "20K-40K", countPassed: 0, countFailed: 0 },
    { range: "40K-60K", countPassed: 0, countFailed: 0 },
    { range: "60K-80K", countPassed: 0, countFailed: 0 },
    { range: ">80K", countPassed: 0, countFailed: 0 },
  ];

  passedCustomers.forEach((customer: any) => {
    if (customer.income < 20000) incomeRanges[0].countPassed++;
    else if (customer.income < 40000) incomeRanges[1].countPassed++;
    else if (customer.income < 60000) incomeRanges[2].countPassed++;
    else if (customer.income < 80000) incomeRanges[3].countPassed++;
    else incomeRanges[4].countPassed++;
  });

  failedCustomers.forEach((customer: any) => {
    if (customer.income < 20000) incomeRanges[0].countFailed++;
    else if (customer.income < 40000) incomeRanges[1].countFailed++;
    else if (customer.income < 60000) incomeRanges[2].countFailed++;
    else if (customer.income < 80000) incomeRanges[3].countFailed++;
    else incomeRanges[4].countFailed++;
  });

  const scatterData = [
    ...passedCustomers.map((customer: any) => ({
      income: customer.income,
      verified: customer.verified
        ? Math.random() * 0.2 + 0.8
        : Math.random() * 0.2, // Spread verified around 0.8-1
      status: "Passed",
    })),
    ...failedCustomers.map((customer: any) => ({
      income: customer.income,
      verified: customer.verified
        ? Math.random() * 0.2 + 0.8
        : Math.random() * 0.2, // Spread verified around 0.8-1
      status: "Failed",
    })),
  ];

  const creditRiskScores = [
    ...passedCustomers.map((customer: any) => ({
      score: customer.credit_risk_score,
      status: "Passed",
    })),
    ...failedCustomers.map((customer: any) => ({
      score: customer.credit_risk_score,
      status: "Failed",
    })),
  ];

  const employmentStatusData = [
    { status: "Employed", passed: 0, failed: 0 },
    { status: "Self-Employed", passed: 0, failed: 0 },
    { status: "Unemployed", passed: 0, failed: 0 },
  ];

  passedCustomers.forEach((customer: any) => {
    if (customer.employment_status === "employed")
      employmentStatusData[0].passed++;
    else if (customer.employment_status === "self-employed")
      employmentStatusData[1].passed++;
    else if (customer.employment_status === "unemployed")
      employmentStatusData[2].passed++;
  });

  failedCustomers.forEach((customer: any) => {
    if (customer.employment_status === "employed")
      employmentStatusData[0].failed++;
    else if (customer.employment_status === "self-employed")
      employmentStatusData[1].failed++;
    else if (customer.employment_status === "unemployed")
      employmentStatusData[2].failed++;
  });

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const transactionByMonth = months.map((month) => ({
    month,
    passed: passedCustomers.filter(
      (customer: any) => new Date(customer.timestamp).getMonth() + 1 === month
    ).length,
    failed: failedCustomers.filter(
      (customer: any) => new Date(customer.timestamp).getMonth() + 1 === month
    ).length,
  }));

  const paymentTypeData = [
    { type: "Credit", passed: 0, failed: 0 },
    { type: "Debit", passed: 0, failed: 0 },
  ];

  passedCustomers.forEach((customer: any) => {
    if (customer.payment_type === "credit") paymentTypeData[0].passed++;
    else if (customer.payment_type === "debit") paymentTypeData[1].passed++;
  });

  failedCustomers.forEach((customer: any) => {
    if (customer.payment_type === "credit") paymentTypeData[0].failed++;
    else if (customer.payment_type === "debit") paymentTypeData[1].failed++;
  });

  return (
    <RootTemplate>
      <div className="p-6">
        <Title level={2} className="mb-4">
          Insights Dashboard
        </Title>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Transaction Status Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    labelLine={true}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#4CAF50", "#F44336"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Income Range Analysis" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeRanges}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="countPassed" fill="#4CAF50" />
                  <Bar dataKey="countFailed" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mt-4">
          <Col span={24}>
            <Card title="Verified vs Unverified Income">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <XAxis dataKey="income" name="Income" />
                  <YAxis
                    dataKey="verified"
                    name="Verified (1) / Unverified (0)"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={scatterData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mt-4">
          <Col span={12}>
            <Card title="Credit Risk Score Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={creditRiskScores}>
                  <XAxis dataKey="score" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="status" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Employment Status Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employmentStatusData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="passed" fill="#4CAF50" />
                  <Bar dataKey="failed" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mt-4">
          <Col span={12}>
            <Card title="Transaction Count by Month" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transactionByMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="passed" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="failed" stroke="#F44336" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Payment Type Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentTypeData}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="passed" fill="#4CAF50" />
                  <Bar dataKey="failed" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <div className="mt-4">
          <Title level={4}>Most Recent Transactions</Title>
          <Table
            columns={[
              {
                title: "Transaction ID",
                dataIndex: "transactionId",
                key: "transactionId",
              },
              { title: "Status", dataIndex: "status", key: "status" },
              { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
            ]}
            dataSource={transactionDetails} // Display recent transactions
            pagination={false}
          />
        </div>
      </div>
    </RootTemplate>
  );
}