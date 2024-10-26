import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  type:
    | 'arthur paux'
    | 'gabriel porier'
    | 'kevin le dortz'
    | 'mathieu caplanne'
    | 'nicolas gautier'
    | 'romain loiseau'
    | 'thomas canu';
  count: number;
  label: string;
  icon: LucideIcon;
  isSelected?: boolean;
  onClick?: () => void;
};

export function StatCard({
  count = 0,
  label,
  icon: Icon,
  isSelected = false,
  onClick,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-green-700 transition-all duration-300 cursor-pointer group',
        isSelected && 'border-green-700 from-zinc-800 to-zinc-900'
      )}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p
              className={cn(
                'text-sm font-medium text-zinc-400 group-hover:text-green-400',
                isSelected && 'text-green-400'
              )}
            >
              {label}
            </p>
            <p
              className={cn(
                'text-2xl font-medium text-zinc-400 group-hover:text-green-400',
                isSelected && 'text-green-400'
              )}
            >
              {count}
            </p>
          </div>
          <div
            className={cn(
              'h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center transition-colors group-hover:bg-green-900',
              isSelected && 'bg-green-900'
            )}
          >
            <Icon
              className={cn(
                'h-6 w-6 text-zinc-400 group-hover:text-green-400',
                isSelected && 'text-green-400'
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
