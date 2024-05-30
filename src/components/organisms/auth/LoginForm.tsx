import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import useLoginUser from "@/components/hooks/auth/useLoginUser";

export type LoginFieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { mutate } = useLoginUser();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className=" min-w-96"
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
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters long" },
          { max: 20, message: "Password must be at most 20 characters long" },
        ]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className=" w-full"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
