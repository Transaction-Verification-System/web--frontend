import { Button, Drawer } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import Localstore from "@/config/localstore";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className=" flex justify-between items-center">
      <Link to={"/"}>Transaction Verification System</Link>

      {/* for devices larger than or md */}
      <div className="hidden md:flex">
        <Links />
      </div>

      {/* for smaller devices */}
      <div className="flex md:hidden">
        <Button onClick={openDrawer} type={"link"}>
          <MenuOutlined />
        </Button>
        <Drawer
          onClose={closeDrawer}
          open={isDrawerOpen}
          className=" flex flex-col gap-5 justify-center"
        >
          <Links />
        </Drawer>
      </div>
    </div>
  );
}

const Links = () => {
  const token = Localstore.getAccessToken();

  const logout = () => {
    // WORK TO DO HERE
    Localstore.removeAccessToken();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-center">
      <Link to={"/dashboard"} className=" hover:underline">
        Dashboard
      </Link>

      {token && (
        <>
          <Link to={"/profile"} className=" hover:underline">
            Insights
          </Link>

          <Link to={"/transactions"} className=" hover:underline">
            Transactions History
          </Link>

          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </div>
  );
};
