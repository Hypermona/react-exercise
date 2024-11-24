import { useState } from "react";
import { FileStructureData, IFileData } from "./utils/filesData";
import style from "./filestructure.module.scss";

function File({
  data,
  onAdd,
}: {
  data: IFileData;
  onAdd: (parent: string, type: "folder" | "file", name: string) => void;
}) {
  const [open, setOpen] = useState(data.isOpen);
  const [showBtn, setshowBtn] = useState(false);
  const [input, setInput] = useState({ open: false, type: "folder" });
  function handleAdd(type: "folder" | "file", e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setOpen(true);
    setInput((prev) => ({ ...prev, type, open: true }));
  }
  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && event?.currentTarget?.value) {
      console.log(event.currentTarget.value);
      onAdd(data?.name, input.type as "folder" | "file", event.currentTarget.value);
      setInput((prev) => ({ ...prev, open: false }));
    }
  }
  return (
    <>
      <li
        className={style.file}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setshowBtn(data?.type === "folder" && true)}
        onMouseLeave={() => setshowBtn(false)}
      >
        {data?.type === "folder" ? "📁" : "📄"} {data.name}
        {showBtn && (
          <div>
            <button onClick={(e) => handleAdd("folder", e)}>+ folder</button>
            <button onClick={(e) => handleAdd("file", e)}>+ file</button>
          </div>
        )}
      </li>
      <ul className={style.child}>
        {input.open && (
          <>
            {input?.type === "folder" ? "📁" : "📄"}{" "}
            <input
              autoFocus
              onBlur={() => setInput((prev) => ({ ...prev, open: false }))}
              onKeyDown={onEnter}
            />
          </>
        )}
        {open &&
          data?.children?.map((childData) => (
            <File data={childData} key={childData.name} onAdd={onAdd} />
          ))}
        {open && data?.type === "folder" && !data?.children?.length && !input.open && "no files"}
      </ul>
    </>
  );
}

function FileStructure() {
  const [filesData, setFilesData] = useState<IFileData[]>(FileStructureData);
  function onAdd(parent: string, type: "folder" | "file", name: string) {
    const updateTree = (function search(tree) {
      for (const t of tree) {
        if (t.name === parent) {
          if (t.children) {
            t?.children?.push({ name, type, isOpen: false });
          } else {
            t["children"] = [{ name, type, isOpen: false }];
          }
        } else {
          if (t?.children) {
            t.children = search(t.children);
          }
        }
      }
      return tree;
    })([...filesData]);
    setFilesData(updateTree);
  }
  return (
    <div className={style.container}>
      <h2>File Structue Tree View</h2>
      <ul>
        {filesData.map((data) => (
          <File data={data} key={data.name} onAdd={onAdd} />
        ))}
      </ul>
    </div>
  );
}

export default FileStructure;
