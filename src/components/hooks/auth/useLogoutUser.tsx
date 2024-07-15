import Localstore from "@/config/localstore";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { message } from "antd"; 

export default function useLogoutUser() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post(`/logout/`);
      Localstore.removeAccessToken();
      message.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      message.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  return { logout };
}
