type BaseRoute = {
  icon: React.ReactElement;
  name: string;
};

type RoutesList = BaseRoute & {
  type: 'list';
  routes: RouteItem[];
};

type RouteItem = BaseRoute & {
  type: 'item';
  path: string;
  element: React.ReactElement;
};

type LogoutBtn = BaseRoute & {
  type: 'logout-btn';
  onClick: () => void;
};

type RouteSkeleton = {
  type: 'skeleton';
  path: string;
  element: React.ReactElement;
};

type RouteMenuItem = RouteItem | RoutesList | 'divider' | RouteSkeleton | LogoutBtn;

type RouteMenu = RouteMenuItem[];
