export const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  admin: "/admin",
  adminUserManage: (id: string) => `/admin/user/${id}`,
  adminProfileSettings: "/admin/profile-settings",
};
