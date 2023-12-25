import { withNavigationWatcher } from '../contexts/navigation';
import {
  HomePage,
  TasksPage,
  ProfilePage,
  CalendarPage,
  PostsPage,
} from '../pages';

const routes = [
  {
    path: '/tasks',
    component: TasksPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/calendar',
    component: CalendarPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
];

export default routes.map((route) => ({
  ...route,
  component: withNavigationWatcher(route.component),
}));
