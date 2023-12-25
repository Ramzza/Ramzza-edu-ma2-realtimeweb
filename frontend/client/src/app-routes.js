import { withNavigationWatcher } from "./contexts/navigation";
import { HomePage, ShowBooksPage, CreateBookPage } from "./pages";

const routes = [
  {
    path: "/show-books",
    component: ShowBooksPage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/create-book",
    component: CreateBookPage,
  },
];

export default routes.map((route) => ({
  ...route,
  component: withNavigationWatcher(route.component),
}));
