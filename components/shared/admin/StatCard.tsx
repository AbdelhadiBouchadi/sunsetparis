import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
};

export const StatCard = ({ count = 0, label, icon: Icon }: StatCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-400">{label}</p>
            <p className="text-2xl font-bold text-white">{count}</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Icon className="h-6 w-6 text-zinc-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
