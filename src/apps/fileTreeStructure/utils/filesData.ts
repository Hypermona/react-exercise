export interface IFileData {
  name: string;
  type: "folder" | "file";
  isOpen?: boolean;
  children?: IFileData[];
}

export const FileStructureData: IFileData[] = [
  {
    name: "public",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "vite.svg",
        type: "file",
      },
    ],
  },
  {
    name: "src",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "components",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "button.tsx",
            type: "file",
          },
          {
            name: "Search Width Input",
            type: "folder",
            isOpen: false,
            children: [
              {
                name: "search.tsx",
                type: "file",
              },
              {
                name: "input.tsx",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        name: "pages",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "home.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "node_modules",
    type: "folder",
  },
];
