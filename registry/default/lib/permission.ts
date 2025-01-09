export type User = { authorisation: Role; id: string };

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  superadmin: ["create:printer", "update:select_printer","update:set_order_status"],
  admin: [],
} as const;

export function hasPermission(user: User, permission: Permission) {
  return [user.authorisation].some((role) =>
    (ROLES[role] as readonly Permission[])?.includes(permission),
  );
}
