'use client';

import { Badge } from '@/components/ui/badge';
import { getUserPermissionLevel } from '@/lib/permissions';
import { Shield, Eye, User } from 'lucide-react';

interface UserPermissionsBadgeProps {
  user: {
    isAdmin: boolean;
    canViewHiddenArtists: boolean;
  };
}

export function UserPermissionsBadge({ user }: UserPermissionsBadgeProps) {
  const permissionLevel = getUserPermissionLevel(user);

  const getPermissionConfig = () => {
    if (user.isAdmin) {
      return {
        variant: 'destructive' as const,
        icon: Shield,
        label: 'Admin',
      };
    }

    if (user.canViewHiddenArtists) {
      return {
        variant: 'secondary' as const,
        icon: Eye,
        label: 'VIP Access',
      };
    }

    return {
      variant: 'outline' as const,
      icon: User,
      label: 'Standard',
    };
  };

  const config = getPermissionConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
