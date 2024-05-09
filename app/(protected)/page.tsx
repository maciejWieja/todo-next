import { Suspense } from 'react';
import TodoList from '../ui/todo-list';
import Loading from '../ui/loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <TodoList />
    </Suspense>
  );
}
