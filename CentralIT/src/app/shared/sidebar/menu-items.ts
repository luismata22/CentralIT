import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    moduleId: 1,
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'mdi mdi-file',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 1000,
    path: '',
    title: 'Configuraciones',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  /* {
    path: 'companies',
    title: 'Empresas',
    icon: 'mdi mdi-equal',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'subsidiaries',
    title: 'Sucursales',
    icon: 'mdi mdi-message-bulleted',
    class: '',
    extralink: false,
    submenu: []
  }, */
  {
    moduleId: 2,
    path: 'departments',
    title: 'Departamentos',
    icon: 'fas fa-building',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 3,
    path: 'positions',
    title: 'Cargos',
    icon: 'fas fa-briefcase',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 4,
    path: 'services',
    title: 'Servicios',
    icon: 'fas fa-server',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 1001,
    path: '',
    title: 'Solicitudes',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    moduleId: 5,
    path: 'panel-requests',
    title: 'Panel',
    icon: 'fas fa-th',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 7,
    path: 'reports',
    title: 'Reportes',
    icon: 'fas fa-clipboard-check',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    moduleId: 1002,
    path: '',
    title: 'Seguridad',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    moduleId: 6,
    path: 'users',
    title: 'Usuarios',
    icon: 'fas fa-users',
    class: '',
    extralink: false,
    submenu: []
  },
  /* {
    path: 'assignroles',
    title: 'Asignar roles',
    icon: 'mdi mdi-arrange-bring-to-front',
    class: '',
    extralink: false,
    submenu: []
  }, */
];
