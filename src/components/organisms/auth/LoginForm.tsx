import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import useLoginUser from "@/components/hooks/auth/useLoginUser";
import Localstore from "@/config/localstore";
import { useNavigate } from "react-router-dom";

export type LoginFieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { mutate, isPending, isSuccess, error, data } = useLoginUser();
  const navigate = useNavigate();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isPending) {
      message.loading({ content: "Loading...", key: "register" });
    }

    if (isSuccess) {
      message.success({
        content: "Login Successful!",
        key: "register",
      });
      Localstore.setAccessToken(data?.data?.['api-token'] as string);
      navigate("/dashboard");
    }

    if (error) {
      message.error({ content: error.message, key: "register" });
    }
  }, [isPending, isSuccess, error, data, navigate]);

  return (
    <Form
      className="min-w-full sm:min-w-96 px-4 py-6 sm:px-8"
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<LoginFieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input size="large" placeholder="Email" className="w-full" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters long" },
          { max: 20, message: "Password must be at most 20 characters long" },
        ]}
      >
        <Input.Password size="large" placeholder="Password" className="w-full" />
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
