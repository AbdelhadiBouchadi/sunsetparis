/**
 * Permission utility functions for user access control
 */

export interface UserPermissions {
  isAdmin: boolean;
  canViewHiddenArtists: boolean;
}

/**
 * Check if user can view hidden artist content
 * @param user - User object from database
 * @returns boolean indicating if user has permission
 */
export function canViewHiddenContent(user: UserPermissions): boolean {
  return user.isAdmin || user.canViewHiddenArtists;
}

/**
 * Check if user has administrative privileges
 * @param user - User object from database
 * @returns boolean indicating if user is admin
 */
export function hasAdminAccess(user: UserPermissions): boolean {
  return user.isAdmin;
}

/**
 * Get user permission level as string for display purposes
 * @param user - User object from database
 * @returns string representing permission level
 */
export function getUserPermissionLevel(user: UserPermissions): string {
  if (user.isAdmin) return 'Administrator';
  if (user.canViewHiddenArtists) return 'VIP Access';
  return 'Standard User';
}
