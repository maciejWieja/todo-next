import Loading from '@/app/ui/loading';
import TaskInfo from '@/app/ui/task-info';
import { Suspense } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <TaskInfo params={params} />
    </Suspense>
  );
}
