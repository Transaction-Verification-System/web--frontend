import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { message } from "antd";

type FieldType = {
  email: string;
  username: string;
  password: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
  message.success("Form values are valid! Api call needs to be made here");
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterForm: React.FC = () => {
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
      <Form.Item<FieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item<FieldType>
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 4, message: "Username must be at least 4 characters long" },
          { max: 20, message: "Username must be at most 20 characters long" },
        ]}
      >
        <Input size="large" placeholder="Username" />
      </Form.Item>

      <Form.Item<FieldType>
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
