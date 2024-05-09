import { Suspense } from 'react';
import ArchiveTodoList from '@/app/ui/archive-todo-list';
import Loading from '@/app/ui/loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ArchiveTodoList />
    </Suspense>
  );
}
