export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Management',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile',
      },
      {
        text: 'Tasks',
        path: '/tasks',
      },
    ],
  },
  {
    text: 'Calendar',
    path: '/calendar',
    icon: 'checklist',
  },
  {
    text: 'Posts',
    path: '/posts',
    icon: 'comment',
  },
];

export default navigation;
