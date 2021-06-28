// Sidebar route metadata
export interface RouteInfo {
  moduleId: number;
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
