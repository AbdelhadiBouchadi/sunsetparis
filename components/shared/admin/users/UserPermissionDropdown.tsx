'use client';

import { useState } from 'react';
import { Check, ChevronDown, Shield, Eye, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { updateUserPermissions } from '@/lib/actions/user.actions';
import { toast } from 'sonner';

interface UserPermissionsDropdownProps {
  user: {
    _id: string;
    isAdmin: boolean;
    canViewHiddenArtists: boolean;
    firstName?: string;
    lastName?: string;
    username: string;
  };
  onPermissionChange?: () => void;
}

export function UserPermissionsDropdown({
  user,
  onPermissionChange,
}: UserPermissionsDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getCurrentPermissionLevel = () => {
    if (user.isAdmin) return 'admin';
    if (user.canViewHiddenArtists) return 'vip';
    return 'standard';
  };

  const getPermissionConfig = (level: string) => {
    switch (level) {
      case 'admin':
        return {
          label: 'Administrator',
          icon: Shield,
          variant: 'destructive' as const,
          description: 'Full system access',
        };
      case 'vip':
        return {
          label: 'VIP Access',
          icon: Eye,
          variant: 'secondary' as const,
          description: 'Can view hidden content',
        };
      default:
        return {
          label: 'Standard User',
          icon: User,
          variant: 'outline' as const,
          description: 'Basic access only',
        };
    }
  };

  const handlePermissionChange = async (newLevel: string) => {
    if (newLevel === getCurrentPermissionLevel()) return;

    setIsUpdating(true);

    try {
      let permissions = {};

      switch (newLevel) {
        case 'admin':
          permissions = { isAdmin: true, canViewHiddenArtists: true };
          break;
        case 'vip':
          permissions = { isAdmin: false, canViewHiddenArtists: true };
          break;
        case 'standard':
          permissions = { isAdmin: false, canViewHiddenArtists: false };
          break;
      }

      await updateUserPermissions(user._id, permissions);

      const userName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username;

      toast.success(`Updated permissions for ${userName}`);

      // Trigger refresh if callback provided
      if (onPermissionChange) {
        onPermissionChange();
      }
    } catch (error) {
      console.error('Failed to update permissions:', error);
      toast.error('Failed to update permissions');
    } finally {
      setIsUpdating(false);
    }
  };

  const currentLevel = getCurrentPermissionLevel();
  const currentConfig = getPermissionConfig(currentLevel);
  const CurrentIcon = currentConfig.icon;

  const permissionOptions = [
    { level: 'standard', ...getPermissionConfig('standard') },
    { level: 'vip', ...getPermissionConfig('vip') },
    { level: 'admin', ...getPermissionConfig('admin') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border border-green-700 w-fit">
        <Button
          variant="ghost"
          className="h-auto p-2 justify-start"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <CurrentIcon className="w-4 h-4 mr-2" />
          )}
          {currentConfig.label}
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {permissionOptions.map((option) => {
          const OptionIcon = option.icon;
          const isSelected = option.level === currentLevel;

          return (
            <DropdownMenuItem
              key={option.level}
              onClick={() => handlePermissionChange(option.level)}
              className="flex items-center justify-between cursor-pointer"
              disabled={isUpdating}
            >
              <div className="flex items-center">
                <OptionIcon className="w-4 h-4 mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
