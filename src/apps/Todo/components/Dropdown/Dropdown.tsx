import { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./dropdown.module.scss";

interface Props {
  value: string;
  palceHolder: string;
  options: { value: string; label: string }[];
  onSelect: (selected: string) => void;
}

function Dropdown({ onSelect, options, palceHolder, value }: Props) {
  const [dimesnsions, setDimensions] = useState<DOMRect | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleClose = (e: MouseEvent) => {
    console.log(dropdownRef.current?.getBoundingClientRect());
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };
  useLayoutEffect(() => {
    setDimensions(dropdownRef.current?.getBoundingClientRect());
  }, []);
  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  const getThePosition = (dime: DOMRect | undefined) => {
    const bottom = dime?.bottom,
      right = dime?.left;
    if (bottom && bottom > window.innerHeight + 100) {
      return { bottom: 0 + (dime?.height || 0) };
    }
    if (right && right > window.innerWidth + 200) {
      return { right: 0 };
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button className={style.dropdown} onClick={() => setOpen((prev) => !prev)}>
        {value || palceHolder}
      </button>
      <ul
        className={style.list}
        style={{ display: open ? "block" : "none", ...getThePosition(dimesnsions) }}
      >
        {options.map((option) => (
          <li className={style.item} key={option.value} onClick={() => onSelect(option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
