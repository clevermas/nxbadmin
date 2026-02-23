export const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  admin: "/admin",
  adminUserManage: (id: string) => `/admin/user/${id}`,
};
