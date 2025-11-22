import { Card } from '@/components/ui/card';

type TableCardProps = {
  hasData: boolean;
  emptyState: React.ReactNode;
  children: React.ReactNode;
};

export function TableCard({ hasData, emptyState, children }: TableCardProps) {
  if (!hasData) {
    return (
      <Card className="flex flex-1 items-center justify-center border-none p-0 shadow-none">
        {emptyState}
      </Card>
    );
  }

  return <Card className="flex overflow-auto p-0 scroll-hide">{children}</Card>;
}
