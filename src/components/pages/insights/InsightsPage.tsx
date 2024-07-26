import React from "react";
import RootTemplate from "@/components/templates/root/RootTemplate";
import { Card, Button, Empty, Tooltip } from "antd";
import {
  PieChartOutlined,
  MoneyCollectOutlined,
  HomeOutlined,
  WalletOutlined,
  ToolOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// URLs for data fetching
const FRAUD_URL = import.meta.env.VITE_API_URL + "/insights/fraud/";
const AML_URL = import.meta.env.VITE_API_URL + "/insights/aml/";

// Function to transform data for recharts
const transformData = (data: Record<string, number> | null): ChartData[] => {
  if (!data) return [];
  return Object.entries(data).map(([name, value], index) => ({
    name,
    value,
    color: getColor(index),
  }));
};

// Component props
interface GraphCardProps {
  title: string;
  description: string;
  data: ChartData[] | undefined;
  graphType: "pie" | "bar";
  icon: React.ReactNode;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface InfoCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

// Function to get a color from the predefined list
const getColor = (index: number): string => colors[index % colors.length];

// Color palette
const colors = [
  "#007bff", // Blue
  "#28a745", // Green
  "#dc3545", // Red
  "#ffc107", // Yellow
  "#17a2b8", // Teal
  "#6f42c1", // Purple
  "#fd7e14", // Orange
  "#20c997", // Cyan
  "#e83e8c", // Pink
  "#6c757d", // Gray
];

// Reusable GraphCard component
const GraphCard: React.FC<GraphCardProps> = ({
  title,
  description,
  data,
  graphType,
  icon,
}) => {
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon}
          <div style={{ marginLeft: "10px" }}>
            <strong>{title}</strong>
            <p
              style={{ margin: 0 }}
              className="font-light whitespace-normal text-xs"
            >
              {description}
            </p>
          </div>
        </div>
      }
      style={{ marginBottom: 20 }}
    >
      <ResponsiveContainer width="100%" height={350}>
        {data && data.length > 0 ? (
          graphType === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || getColor(index)}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || getColor(index)}
                  />
                ))}
              </Bar>
            </BarChart>
          )
        ) : (
          <Empty
            description="No Data Available"
            style={{ textAlign: "center", padding: "20px" }}
          />
        )}
      </ResponsiveContainer>
    </Card>
  );
};

// Reusable InfoCard component
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <Card style={{ marginBottom: 20, borderRadius: 8, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
        <div style={{ marginLeft: "15px" }}>
          <strong style={{ fontSize: '16px', color: '#333' }}>{title}</strong>
          <p
            style={{ margin: 0, fontSize: '14px', color: '#666' }}
            className="font-light whitespace-normal"
          >
            {description}
          </p>
          <h2 style={{ marginTop: "10px", fontSize: "24px", fontWeight: 'bold', color: '#000' }}>
            {value}
          </h2>
        </div>
      </div>
    </Card>
  );
};

const InsightsPage: React.FC = () => {
  const navigate = useNavigate();

  // Queries for PF data
  const { data: fraudPFData } = useQuery({
    queryKey: ["fraudPF"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "pf/");
      return response.data;
    },
  });

  const { data: amlPFData } = useQuery({
    queryKey: ["amlPF"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "pf/");
      return response.data;
    },
  });

  // Queries for graphs data
  const employmentFraudQuery = useQuery({
    queryKey: ["employmentFraud"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "employment/");
      return transformData(response.data);
    },
  });

  const employmentAMLQuery = useQuery({
    queryKey: ["employmentAML"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "employment/");
      return transformData(response.data);
    },
  });

  const fraudDeviceQuery = useQuery({
    queryKey: ["fraudDevice"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "device/");
      return transformData(response.data);
    },
  });

  const amlDeviceQuery = useQuery({
    queryKey: ["amlDevice"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "device/");
      return transformData(response.data);
    },
  });

  const fraudHousingQuery = useQuery({
    queryKey: ["fraudHousing"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "housing/");
      return transformData(response.data);
    },
  });

  const amlHousingQuery = useQuery({
    queryKey: ["amlHousing"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "housing/");
      return transformData(response.data);
    },
  });

  const fraudPaymentQuery = useQuery({
    queryKey: ["fraudPayment"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "payment/");
      return transformData(response.data);
    },
  });

  const amlPaymentQuery = useQuery({
    queryKey: ["amlPayment"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "payment/");
      return transformData(response.data);
    },
  });

  const fraudTypeQuery = useQuery({
    queryKey: ["fraudType"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "type/");
      return transformData(response.data);
    },
  });

  const amlTypeQuery = useQuery({
    queryKey: ["amlType"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "type/");
      return transformData(response.data);
    },
  });

  const fraudSourceQuery = useQuery({
    queryKey: ["fraudSource"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "source/");
      return transformData(response.data);
    },
  });

  const amlSourceQuery = useQuery({
    queryKey: ["amlSource"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "source/");
      return transformData(response.data);
    },
  });

  return (
    <RootTemplate>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Insights on Fraud and AML</h1>
        <p>
          Explore detailed statistics and insights into fraud and anti-money laundering activities across various sectors.
        </p>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-10">Fraud Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            title="Banking Fail"
            value={fraudPFData?.banking?.fail || 0}
            description="Failed fraud cases in banking."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Banking Pass"
            value={fraudPFData?.banking?.pass || 0}
            description="Passed fraud cases in banking."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
          <InfoCard
            title="Ecommerce Fail"
            value={fraudPFData?.ecommerce?.fail || 0}
            description="Failed fraud cases in ecommerce."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Ecommerce Pass"
            value={fraudPFData?.ecommerce?.pass || 0}
            description="Passed fraud cases in ecommerce."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
          <InfoCard
            title="Credit Card Fail"
            value={fraudPFData?.credit_card?.fail || 0}
            description="Failed fraud cases in credit cards."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Credit Card Pass"
            value={fraudPFData?.credit_card?.pass || 0}
            description="Passed fraud cases in credit cards."
            icon={<SafetyOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-10">Money Laundering Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            title="Banking Fail"
            value={amlPFData?.banking?.fail || 0}
            description="Failed AML cases in banking."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Banking Pass"
            value={amlPFData?.banking?.pass || 0}
            description="Passed AML cases in banking."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
          <InfoCard
            title="Ecommerce Fail"
            value={amlPFData?.ecommerce?.fail || 0}
            description="Failed AML cases in ecommerce."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Ecommerce Pass"
            value={amlPFData?.ecommerce?.pass || 0}
            description="Passed AML cases in ecommerce."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
          <InfoCard
            title="Credit Card Fail"
            value={amlPFData?.credit_card?.fail || 0}
            description="Failed AML cases in credit cards."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#dc3545" }} />}
          />
          <InfoCard
            title="Credit Card Pass"
            value={amlPFData?.credit_card?.pass || 0}
            description="Passed AML cases in credit cards."
            icon={<MoneyCollectOutlined style={{ fontSize: "24px", color: "#28a745" }} />}
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold">Fraud Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GraphCard
            title="Rate of Employment in Fraud"
            description="Statistics on fraud activities across various employment categories."
            data={employmentFraudQuery.data}
            graphType="bar"
            icon={
              <PieChartOutlined
                style={{ fontSize: "24px", color: "#dc3545" }}
              />
            }
          />
          <GraphCard
            title="Fraud by Device"
            description="Distribution of fraud cases by device type."
            data={fraudDeviceQuery.data}
            graphType="bar"
            icon={
              <ToolOutlined style={{ fontSize: "24px", color: "#fd7e14" }} />
            }
          />
          <GraphCard
            title="Fraud in Housing"
            description="Insights into fraud activities across various housing categories."
            data={fraudHousingQuery.data}
            graphType="bar"
            icon={
              <HomeOutlined style={{ fontSize: "24px", color: "#dc3545" }} />
            }
          />
          <GraphCard
            title="Fraud in Payment"
            description="Analysis of fraud activities in different payment methods."
            data={fraudPaymentQuery.data}
            graphType="bar"
            icon={
              <WalletOutlined style={{ fontSize: "24px", color: "#dc3545" }} />
            }
          />
          <GraphCard
            title="Fraud by Type"
            description="Breakdown of fraud activities by type."
            data={fraudTypeQuery.data}
            graphType="bar"
            icon={
              <PieChartOutlined
                style={{ fontSize: "24px", color: "#dc3545" }}
              />
            }
          />
          <GraphCard
            title="Fraud by Source"
            description="Data on the sources of reported fraud activities."
            data={fraudSourceQuery.data}
            graphType="bar"
            icon={
              <SafetyOutlined style={{ fontSize: "24px", color: "#dc3545" }} />
            }
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold">Money Laundering Risk Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GraphCard
            title="Rate of Employment in AML"
            description="Statistics on AML activities across various employment categories."
            data={employmentAMLQuery.data}
            graphType="bar"
            icon={
              <PieChartOutlined
                style={{ fontSize: "24px", color: "#17a2b8" }}
              />
            }
          />
          <GraphCard
            title="Money Laundering by Device"
            description="Data highlighting money laundering activities by device type."
            data={amlDeviceQuery.data}
            graphType="bar"
            icon={
              <ToolOutlined style={{ fontSize: "24px", color: "#6f42c1" }} />
            }
          />
          <GraphCard
            title="Money Laundering in Housing"
            description="Analysis of money laundering activities in various housing sectors."
            data={amlHousingQuery.data}
            graphType="bar"
            icon={
              <HomeOutlined style={{ fontSize: "24px", color: "#17a2b8" }} />
            }
          />
          <GraphCard
            title="Money Laundering in Payment"
            description="Insights into money laundering activities across different payment methods."
            data={amlPaymentQuery.data}
            graphType="bar"
            icon={
              <WalletOutlined style={{ fontSize: "24px", color: "#17a2b8" }} />
            }
          />
          <GraphCard
            title="Money Laundering by Type"
            description="Breakdown of money laundering activities by type."
            data={amlTypeQuery.data}
            graphType="bar"
            icon={
              <PieChartOutlined
                style={{ fontSize: "24px", color: "#17a2b8" }}
              />
            }
          />
          <GraphCard
            title="Money Laundering by Source"
            description="Data on the sources of reported money laundering activities."
            data={amlSourceQuery.data}
            graphType="bar"
            icon={
              <SafetyOutlined style={{ fontSize: "24px", color: "#17a2b8" }} />
            }
          />
        </div>
      </div>

      <Button
        type="primary"
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          fontSize: "18px",
          padding: "10px 20px",
        }}
        onClick={() => navigate("/geologs")}
      >
        GeoLogs
      </Button>
    </RootTemplate>
  );
};

export default InsightsPage;
