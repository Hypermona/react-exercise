import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import style from "./layout.module.scss";
import Header from "./components/header/Header";
function Layout() {
  return (
    <div>
      <Header />
      <div className={style.content}>
        <Sidebar />
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
