import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppNavigation } from '@components/common';

export const AppLayout: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const routeItems = useMemo(() => {
    const mainItem: RouteMenu = [];
    const subItem: RouteMenu = [];
    const items: { path: string; element: React.ReactElement }[] = [];

    for (const menuItem of menu) {
      if (menuItem.type === 'logout-btn') {
        subItem.push({ type: menuItem.type, name: menuItem.name, onClick: menuItem.onClick });
        continue;
      }

      items.push({ path: menuItem.path, element: menuItem.element });
      if (menuItem.type === 'main-item') {
        mainItem.push({
          type: menuItem.type,
          name: menuItem.name,
          path: menuItem.path,
          element: menuItem.element
        });
      }
      if (menuItem.type === 'sub-item') {
        subItem.push({
          type: menuItem.type,
          name: menuItem.name,
          path: menuItem.path,
          element: menuItem.element
        });
      }
    }

    return {
      items,
      mainItem,
      subItem
    };
  }, [menu]);

  return (
    <div className='flex flex-col h-screen sm:min-h-screen'>
      <AppNavigation mainMenu={routeItems.mainItem} subMenu={routeItems.subItem} />
      <div className='lg:p-4 flex-1 h-100vh bg-gray-200'>
        <Routes>
          {routeItems.items.map((item) => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </div>
    </div>
  );
};
