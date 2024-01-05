import { ArrowDown, ArrowUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardAnalyticProps {
  title: string;
  total: any;
  icon?: React.ReactNode;
  percentage: number;
  className?: string;
}

const CardAnalytic = ({
  title,
  icon,
  total,
  percentage,
  className,
}: CardAnalyticProps) => {
  return (
    <Card className={cn('shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-bold">{title}</CardTitle>
        {icon && <>{icon}</>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="flex items-center justify-start gap-1 text-xs text-muted-foreground">
          {percentage > 0 ? (
            <ArrowUp className="inline size-3 text-success" strokeWidth={3} />
          ) : (
            <ArrowDown className="inline size-3 text-error" strokeWidth={3} />
          )}
          {Math.abs(percentage)}% so với tháng trước
        </p>
      </CardContent>
    </Card>
  );
};

export default CardAnalytic;
