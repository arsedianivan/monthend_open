from enum import Enum

class Role(str, Enum):
    admin = "admin"
    user = "user"
    viewer = "viewer"

role_permissions = {
    Role.admin: ["create", "read", "update", "delete"],
    Role.user: ["create", "read", "update"],
    Role.viewer: ["read"]
}
