import React from 'react';

const Routes = [
  {
    path: '/',
    component: React.lazy(() => import('containers/HomePageContainer')),
    exact: true,
    key: 'home',
  },
  {
    path: '/calendar',
    component: React.lazy(() => import('containers/CalendarContainer')),
    exact: false,
    key: 'calendar',
  },
];

export default Routes;
