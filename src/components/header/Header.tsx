import Dropdown from "../../apps/Todo/components/Dropdown/Dropdown";
import style from "./header.module.scss";

function Header() {
  return (
    <nav className={style.nav}>
      <div className={style.front}>
        <h3>LOGO</h3>
      </div>
      <Dropdown
        onSelect={() => {}}
        options={[
          { value: "dark", label: "DarkZZZZZZZZZZZZZZZZZ" },
          { value: "dark", label: "Dark" },
        ]}
        palceHolder="Select Theme"
        value="light"
      />
    </nav>
  );
}

export default Header;
