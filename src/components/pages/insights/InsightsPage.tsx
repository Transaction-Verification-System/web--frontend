import RootTemplate from "@/components/templates/root/RootTemplate";
import { Card, Col, Row, Typography, Table } from "antd";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, Tooltip, CartesianGrid,
  LineChart, Line
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

  // Ensure data is in the expected format
  const passedCustomers = Array.isArray(data?.passed_customer_data) ? data.passed_customer_data : [];
  const failedCustomers = Array.isArray(data?.failed_customer_data) ? data.failed_customer_data : [];

  // Transaction details
  const transactionDetails = [
    ...passedCustomers.map((customer:any) => ({
      transactionId: `TX-${customer.id}`,
      status: "Passed",
      timestamp: new Date().toISOString(),
    })),
    ...failedCustomers.map((customer:any) => ({
      transactionId: `TX-${customer.id}`,
      status: "Failed",
      timestamp: new Date().toISOString(),
    })),
  ].slice(0, 5);

  // Total passed and failed
  const totalPassed = passedCustomers.length;
  const totalFailed = failedCustomers.length;

  // Pie data for passed and failed
  const pieData = [
    { name: "Passed", value: totalPassed },
    { name: "Failed", value: totalFailed },
  ];

  // Income range distribution
  const incomeRanges = [
    { range: "<20K", countPassed: 0, countFailed: 0 },
    { range: "20K-40K", countPassed: 0, countFailed: 0 },
    { range: "40K-60K", countPassed: 0, countFailed: 0 },
    { range: "60K-80K", countPassed: 0, countFailed: 0 },
    { range: ">80K", countPassed: 0, countFailed: 0 },
  ];

  passedCustomers.forEach((customer:any) => {
    if (customer.income < 20000) incomeRanges[0].countPassed++;
    else if (customer.income < 40000) incomeRanges[1].countPassed++;
    else if (customer.income < 60000) incomeRanges[2].countPassed++;
    else if (customer.income < 80000) incomeRanges[3].countPassed++;
    else incomeRanges[4].countPassed++;
  });

  failedCustomers.forEach((customer:any) => {
    if (customer.income < 20000) incomeRanges[0].countFailed++;
    else if (customer.income < 40000) incomeRanges[1].countFailed++;
    else if (customer.income < 60000) incomeRanges[2].countFailed++;
    else if (customer.income < 80000) incomeRanges[3].countFailed++;
    else incomeRanges[4].countFailed++;
  });

  // Employment status distribution
  const employmentStatusData = [
    { status: "Employed", passed: 0, failed: 0 },
    { status: "Self-Employed", passed: 0, failed: 0 },
    { status: "Unemployed", passed: 0, failed: 0 },
  ];

  passedCustomers.forEach((customer:any) => {
    if (customer.employment_status === "employed")
      employmentStatusData[0].passed++;
    else if (customer.employment_status === "self-employed")
      employmentStatusData[1].passed++;
    else if (customer.employment_status === "unemployed")
      employmentStatusData[2].passed++;
  });

  failedCustomers.forEach((customer:any) => {
    if (customer.employment_status === "employed")
      employmentStatusData[0].failed++;
    else if (customer.employment_status === "self-employed")
      employmentStatusData[1].failed++;
    else if (customer.employment_status === "unemployed")
      employmentStatusData[2].failed++;
  });

  // Payment type distribution
  const paymentTypeData = [
    { type: "Credit", passed: 0, failed: 0 },
    { type: "Debit", passed: 0, failed: 0 },
  ];

  passedCustomers.forEach((customer:any) => {
    if (customer.payment_type === "credit") paymentTypeData[0].passed++;
    else if (customer.payment_type === "debit") paymentTypeData[1].passed++;
  });

  failedCustomers.forEach((customer:any) => {
    if (customer.payment_type === "credit") paymentTypeData[0].failed++;
    else if (customer.payment_type === "debit") paymentTypeData[1].failed++;
  });

  // Cause of failure data and USD transactions count
  const failureReasonsData = [
    { reason: "AI model prediction", count: 0 },
    { reason: "Blacklist check", count: 0 },
    // Add other reasons here
  ];
  let usdTransactionCount = 0;

  const failedLocations = {};

  failedCustomers.forEach((customer:any) => {
    const reason = customer.reason;
    const reasonData = failureReasonsData.find(r => r.reason === reason);
    if (reasonData) reasonData.count++;

    if (customer.payment_currency === "USD" || customer.received_currency === "USD") {
      usdTransactionCount++;
    }

    const location = customer.country || 'Unknown';
    if (!failedLocations[location]) {
      failedLocations[location] = 0;
    }
    failedLocations[location]++;
  });

  // Determine the location with the most failures
  const mostFailedLocation = Object.entries(failedLocations).sort((a, b) => b[1] - a[1])[0];

  // Device distribution data
  const deviceData = [
    { type: "iOS", count: 0 },
    { type: "Android", count: 0 },
  ];

  [...passedCustomers, ...failedCustomers].forEach((transaction) => {
    const device = transaction.device_os;
    const deviceInfo = deviceData.find(d => d.type === device);
    if (deviceInfo) deviceInfo.count++;
  });

  // Currency usage data
  const currencyData = [];

  [...passedCustomers, ...failedCustomers].forEach((transaction) => {
    const paymentCurrency = transaction.payment_currency;
    const receivedCurrency = transaction.received_currency;
    
    // Update payment currency
    let currencyInfo = currencyData.find(c => c.currency === paymentCurrency);
    if (!currencyInfo) {
      currencyInfo = { currency: paymentCurrency, count: 0 };
      currencyData.push(currencyInfo);
    }
    currencyInfo.count++;

    // Update received currency
    currencyInfo = currencyData.find(c => c.currency === receivedCurrency);
    if (!currencyInfo) {
      currencyInfo = { currency: receivedCurrency, count: 0 };
      currencyData.push(currencyInfo);
    }
    currencyInfo.count++;
  });

  // Daily transactions data
  const dailyData = {};

  [...passedCustomers, ...failedCustomers].forEach((transaction) => {
    const date = transaction.date;
    if (!dailyData[date]) dailyData[date] = 0;
    dailyData[date]++;
  });

  return (
    <RootTemplate>
      <div className="p-6">
        <Title level={2} className="mb-4">Insights Dashboard</Title>
        
        {/* Transaction Status Distribution */}
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Transaction Status Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={["#4CAF50", "#F44336"][index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          
          {/* Employment Status Distribution */}
          <Col span={12}>
            <Card title="Employment Status Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={employmentStatusData}>
                  <XAxis dataKey="status" />
                  <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="passed" fill="#4CAF50" />
                  <Bar dataKey="failed" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16} className="mt-4">
          {/* Payment Type Distribution */}
          <Col span={12}>
            <Card title="Payment Type Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={paymentTypeData}>
                  <XAxis dataKey="type" />
                  <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="passed" fill="#4CAF50" />
                  <Bar dataKey="failed" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          
          {/* Device Distribution */}
          <Col span={12}>
            <Card title="Device Distribution" className="mb-4">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="count"
                    nameKey="type"
                    outerRadius={120}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {deviceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={["#4285F4", "#34A853"][index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16} className="mt-4">
          {/* Cause of Failure Card */}
          <Col span={12}>
            <Card title="Most Common Cause of Failure" className="mb-4">
              <p>{failureReasonsData.sort((a, b) => b.count - a.count)[0]?.reason || 'Unknown'}</p>
              <p>Total Count: {failureReasonsData.reduce((sum, item) => sum + item.count, 0)}</p>
            </Card>
          </Col>
          
          {/* USD Transactions Card */}
          <Col span={12}>
            <Card title="USD Transactions Count" className="mb-4">
              <p>Total USD Transactions: {usdTransactionCount}</p>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16} className="mt-4">
          {/* Most Failed Transactions Location */}
          <Col span={12}>
            <Card title="Location with Most Failed Transactions" className="mb-4">
              <p>{mostFailedLocation ? mostFailedLocation[0] : 'Unknown'}</p>
              <p>Total Failures: {mostFailedLocation ? mostFailedLocation[1] : 0}</p>
            </Card>
          </Col>
          
          {/* Daily Transaction Overview */}
          <Col span={12}>
            <Card title="Daily Transaction Overview" className="mb-4">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={Object.entries(dailyData).map(([date, count]) => ({ date, count }))}>
                  <XAxis dataKey="date" />
                  <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        
        {/* Recent Transactions Table */}
        <div className="mt-4">
          <Title level={4}>Most Recent Transactions</Title>
          <Table
            columns={[
              { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
              { title: "Status", dataIndex: "status", key: "status" },
              { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
            ]}
            dataSource={transactionDetails}
            pagination={false}
          />
        </div>
      </div>
    </RootTemplate>
  );
}
