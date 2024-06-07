import Localstore from "@/config/localstore";
import { TemplateProps } from "@/constants/interface/TemplateProps.interface";
import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 *-----------------------------------------------------------------------------
 * @returns AuthProvider component
 *
 * @description
 * displays the authentication provider
 * that wraps the children components
 *-----------------------------------------------------------------------------
 */
export default function AuthProvider({ children }: TemplateProps) {
  const token = Localstore.getAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      message.error("Please login to access this page!");
    }
  }, [token, navigate]);

  return children;
}
