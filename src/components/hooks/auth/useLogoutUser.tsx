import Localstore from "@/config/localstore";
import { useNavigate } from "react-router-dom";

export default function useLogoutUser() {
  const navigate = useNavigate();

  const logout = () => {
    Localstore.removeAccessToken();
    navigate("/");
  };

  return { logout };
}
