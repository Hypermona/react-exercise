import { Link } from "react-router-dom";
import style from "./sidebar.module.scss";
import { selectedNavs } from "../../routes";

export interface ISideBar {
  label: string;
  path: string;
  children?: ISideBar[];
}

function Item({ route, noBorder }: { route: ISideBar; noBorder?: boolean }) {
  return (
    <li className={style.item} style={noBorder ? { border: "none", padding: "4px 5px" } : {}}>
      <Link to={route.path}>{route.label}</Link>
      <ul style={{ padding: 5 }}>
        {route.children?.map((childRoute: ISideBar) => (
          <Item route={childRoute} key={childRoute.path} noBorder />
        ))}
      </ul>
    </li>
  );
}

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <ul style={{ padding: 5 }}>
        {selectedNavs.map((route: ISideBar) => (
          <Item route={route} key={route.path} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
