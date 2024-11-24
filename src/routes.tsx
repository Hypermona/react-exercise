import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { createSelector } from "reselect";
import Todo from "./apps/Todo";
import TodoUseReducer from "./apps/Todo/TodoRedux";
import TodoRedux from "./apps/Todo/TodoRedux";
import Animation from "./apps/Animation";
import { ISideBar } from "./components/sidebar";
import FileStructure from "./apps/fileTreeStructure/FileStructure";

export const Routes = [
  {
    label: "Home",
    path: "/",
    element: <p>Home</p>,
  },
  {
    label: "Simple Todo",
    path: "/todo",
    element: <Todo />,
    children: [
      {
        label: "Todo with useReducer",
        path: "/todo/usereducer",
        element: <TodoUseReducer />,
      },
      {
        label: "todo with context",
        path: "/todo/context",
      },
      {
        label: "todo with redux",
        path: "/todo/redux",
        element: <TodoRedux />,
      },
    ],
  },
  {
    label: "SCSS Animations",
    path: "animation",
    element: <Animation />,
  },
  {
    label: "File Tree Structure",
    path: "file-structure",
    element: <FileStructure />,
  },
];

const memoizedRoutes = createSelector([(routes) => routes], (routes) => {
  return routes.map((route: (typeof routes)[0]) => ({
    path: route.path,
    ...(route?.element ? { element: route.element } : {}),
    ...(route?.children ? { children: memoizedRoutes.resultFunc(route.children) } : {}),
  }));
});
const memoizedNavs = createSelector(
  [(routes: ISideBar[]) => routes],
  (routes: ISideBar[]): ISideBar[] =>
    routes.map((route) => ({
      path: route.path,
      label: route.label,
      ...(route.children ? { children: memoizedNavs.resultFunc(route.children) } : {}),
    }))
);

export const selectedRoutes = memoizedRoutes(Routes);
export const selectedNavs = memoizedNavs(Routes);

console.log(selectedRoutes);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...selectedRoutes,
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);
