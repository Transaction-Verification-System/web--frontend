import React from "react";
import RootTemplate from "@/components/templates/root/RootTemplate";
import { Card, Empty, Badge, Button } from "antd";
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
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

// Types for the data and props
interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface GraphCardProps {
  title: string;
  description: string;
  data: ChartData[] | undefined;
  graphType: "pie" | "bar";
  icon: React.ReactNode;
}

// Reusable GraphCard component
const GraphCard: React.FC<GraphCardProps> = ({ title, description, data, graphType, icon }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <div style={{ marginLeft: '10px' }}>
            <strong>{title}</strong>
            <p style={{ margin: 0 }} className="font-light whitespace-normal text-xs">
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
                  <Cell key={`cell-${index}`} fill={entry.color || "#007bff"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          )
        ) : (
          <Empty description="No Data Available" style={{ textAlign: 'center', padding: '20px' }} />
        )}
      </ResponsiveContainer>
    </Card>
  );
};

const FRAUD_URL = import.meta.env.VITE_API_URL + "/insights/fraud/";
const AML_URL = import.meta.env.VITE_API_URL + "/insights/aml/";

// Predefined list of visible and professional colors
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

// Function to get a visible color
const getColor = (index: number): string => colors[index % colors.length];

// Function to transform the data into the required format
const transformData = (data: Record<string, number> | null): ChartData[] => {
  if (!data) return [];
  return Object.entries(data).map(([name, value], index) => ({
    name,
    value,
    color: getColor(index),
  }));
};

const InsightsPage: React.FC = () => {
  const navigate = useNavigate();

  // Existing queries
  const employmentFraudQuery = useQuery<ChartData[]>({
    queryKey: ["employmentFraud"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "employment/");
      return transformData(response.data);
    },
  });

  const employmentAMLQuery = useQuery<ChartData[]>({
    queryKey: ["employmentAML"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "employment/");
      return transformData(response.data);
    },
  });

  const fraudDeviceQuery = useQuery<ChartData[]>({
    queryKey: ["fraudDevice"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "device/");
      return transformData(response.data);
    },
  });

  const amlDeviceQuery = useQuery<ChartData[]>({
    queryKey: ["amlDevice"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "device/");
      return transformData(response.data);
    },
  });

  // New queries for housing and payment data
  const fraudHousingQuery = useQuery<ChartData[]>({
    queryKey: ["fraudHousing"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "housing/");
      return transformData(response.data);
    },
  });

  const amlHousingQuery = useQuery<ChartData[]>({
    queryKey: ["amlHousing"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "housing/");
      return transformData(response.data);
    },
  });

  const fraudPaymentQuery = useQuery<ChartData[]>({
    queryKey: ["fraudPayment"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "payment/");
      return transformData(response.data);
    },
  });

  const amlPaymentQuery = useQuery<ChartData[]>({
    queryKey: ["amlPayment"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "payment/");
      return transformData(response.data);
    },
  });

  const fraudSourceQuery = useQuery<ChartData[]>({
    queryKey: ["fraudSource"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "source/");
      return transformData(response.data);
    },
  });

  const amlSourceQuery = useQuery<ChartData[]>({
    queryKey: ["amlSource"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "source/");
      return transformData(response.data);
    },
  });

  return (
    <RootTemplate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GraphCard
          title="Rate of Employment on Money Laundering"
          description="Data highlighting Money Laundering activities across various employment categories."
          data={employmentAMLQuery.data}
          graphType="bar"
          icon={<Badge count="AML" style={{ backgroundColor: '#17a2b8' }} />}
        />
        <GraphCard
          title="Rate of Employment on Fraud"
          description="Data highlighting Fraud activities across various employment categories."
          data={employmentFraudQuery.data}
          graphType="pie"
          icon={<Badge count="Fraud" style={{ backgroundColor: '#dc3545' }} />}
        />
        <GraphCard
          title="Money Laundering by Device"
          description="Data highlighting Money Laundering activities by device type."
          data={amlDeviceQuery.data}
          graphType="bar"
          icon={<Badge count="Device AML" style={{ backgroundColor: '#6f42c1' }} />}
        />
        <GraphCard
          title="Fraud by Device"
          description="Statistics showing the distribution of fraud cases by device type."
          data={fraudDeviceQuery.data}
          graphType="bar"
          icon={<Badge count="Device Fraud" style={{ backgroundColor: '#fd7e14' }} />}
        />
        <GraphCard
          title="Money Laundering in Housing"
          description="Data highlighting Money Laundering activities across various housing categories."
          data={amlHousingQuery.data}
          graphType="bar"
          icon={<Badge count="Housing AML" style={{ backgroundColor: '#17a2b8' }} />}
        />
        <GraphCard
          title="Fraud in Housing"
          description="Data highlighting Fraud activities across various housing categories."
          data={fraudHousingQuery.data}
          graphType="bar"
          icon={<Badge count="Housing Fraud" style={{ backgroundColor: '#dc3545' }} />}
        />
        <GraphCard
          title="Money Laundering in Payment"
          description="Data highlighting Money Laundering activities across various payment categories."
          data={amlPaymentQuery.data}
          graphType="bar"
          icon={<Badge count="Payment AML" style={{ backgroundColor: '#17a2b8' }} />}
        />
        <GraphCard
          title="Fraud in Payment"
          description="Data highlighting Fraud activities across various payment categories."
          data={fraudPaymentQuery.data}
          graphType="bar"
          icon={<Badge count="Payment Fraud" style={{ backgroundColor: '#dc3545' }} />}
        />
        <GraphCard
          title="Money Laundering by Source"
          description="Data highlighting Money Laundering activities by source."
          data={amlSourceQuery.data}
          graphType="bar"
          icon={<Badge count="Source AML" style={{ backgroundColor: '#17a2b8' }} />}
        />
        <GraphCard
          title="Fraud by Source"
          description="Data highlighting Fraud activities by source."
          data={fraudSourceQuery.data}
          graphType="bar"
          icon={<Badge count="Source Fraud" style={{ backgroundColor: '#dc3545' }} />}
        />
      </div>
      <Button
        type="primary"
        style={{ position: 'fixed', bottom: 30, right: 30 }}
        onClick={() => navigate('/geologs')}
      >
        GeoLogs
      </Button>
    </RootTemplate>
  );
};

export default InsightsPage;
