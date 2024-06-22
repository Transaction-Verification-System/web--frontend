import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import useRegisterUser from "@/components/hooks/auth/useRegisterUser";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import displayError from "@/utils/displayError";

export type RegisterFormFieldType = {
  email: string;
  username: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { mutate, isPending, isSuccess, error } = useRegisterUser();
  const navigate = useNavigate();

  const onFinish: FormProps<RegisterFormFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  const onFinishFailed: FormProps<RegisterFormFieldType>["onFinishFailed"] = (
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
        content: "User registered successfully!",
        key: "register",
      });
      navigate("/login");
    }

    if (error) {
      if (error) {
        displayError(error as AxiosError, "register")
      }     
    }
  }, [isPending, isSuccess, error, navigate]);

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
      <Form.Item<RegisterFormFieldType>
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 4, message: "Username must be at least 4 characters long" },
          { max: 20, message: "Username must be at most 20 characters long" },
        ]}
      >
        <Input size="large" placeholder="Username" className="w-full" />
      </Form.Item>

      <Form.Item<RegisterFormFieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input size="large" placeholder="Email" className="w-full" />
      </Form.Item>

      <Form.Item<RegisterFormFieldType>
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
