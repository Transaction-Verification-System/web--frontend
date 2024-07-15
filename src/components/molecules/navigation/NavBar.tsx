import { Button, Drawer } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import Localstore from "@/config/localstore";
import useLogoutUser from "@/components/hooks/auth/useLogoutUser";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/" className="text-lg font-bold">
        Transaction Verification System
      </Link>

      {/* For devices larger than md */}
      <div className="hidden md:flex">
        <Links />
      </div>

      {/* For smaller devices */}
      <div className="flex md:hidden">
        <Button onClick={openDrawer} type="link">
          <MenuOutlined />
        </Button>
        <Drawer
          onClose={closeDrawer}
          open={isDrawerOpen}
          className="flex flex-col gap-5 justify-center"
        >
          <Links />
        </Drawer>
      </div>
    </div>
  );
}

const Links = () => {
  const token = Localstore.getAccessToken();
  const { logout } = useLogoutUser();

  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-center">
      {token ? (
        <>
          <Link to="/dashboard" className="hover:underline">
            Live Dashboard

          </Link>
          <Link to="/insights" className="hover:underline">
            Insights
          </Link>
          <Link to="/transactions" className="hover:underline">
            Transactions History
          </Link>
          <Button onClick={logout} type="link">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Signup
          </Link>
        </>
      )}
    </div>
  );
};
