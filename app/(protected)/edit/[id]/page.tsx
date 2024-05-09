import EditForm from '@/app/ui/edit-form';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <EditForm params={params} />
    </Suspense>
  );
}
