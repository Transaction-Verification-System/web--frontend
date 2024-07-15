import Localstore from "@/config/localstore";
import { useNavigate } from "react-router-dom";
import { message } from "antd"; 

export default function useLogoutUser() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      Localstore.removeAccessToken();
      Localstore.removeAPIToken();
      message.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      message.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  return { logout };
}
