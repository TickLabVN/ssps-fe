type RoutesList = {
  name: string;
  type: 'list';
  routes: RouteItem[];
};

type RouteItem = {
  name: string;
  type: 'main-item' | 'sub-item';
  path: string;
  element: React.ReactElement;
};

type LogoutBtn = {
  name: string;
  type: 'logout-btn';
  onClick: () => void;
};

type RouteSkeleton = {
  name: string;
  type: 'skeleton';
  path: string;
  element: React.ReactElement;
};

type RouteMenuItem = RouteItem | RoutesList | RouteSkeleton | LogoutBtn;

type RouteMenu = RouteMenuItem[];
