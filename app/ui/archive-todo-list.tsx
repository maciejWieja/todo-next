import { auth } from '@/auth';
import prisma from '@/db';
import Image from 'next/image';
import { changeDoneStatus, deleteTask } from '../lib/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ArchiveTodoList() {
  const session = await auth();

  const tasks = await prisma.task.findMany({
    where: {
      authorId: Number(session?.user?.id),
      done: true,
    },
    orderBy: {
      endTime: 'asc',
    },
  });

  if (tasks.length === 0) {
    return <h1 className="m-[40px] text-[32px] font-bold">There is no task in the archive yet</h1>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-[30px] gap-y-[40px] p-[30px]">
      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="group relative border-[3px] border-black h-[200px] rounded-[12px] bg-blue-light max-w-[300px]"
          >
            <div className="w-full h-full overflow-y-auto pt-[20px] px-[20px] pb-[10px] font-bold text-[20px]">
              {task.title}
            </div>
            <div className="hidden group-hover:flex justify-center gap-[10px] absolute bottom-0 left-0 w-full h-[60px] bg-[#00000080]">
              <form
                action={async () => {
                  'use server';
                  await deleteTask(task.id);
                  revalidatePath('/');
                }}
                className="flex items-center"
              >
                <button type="submit">
                  <Image
                    src="/AiOutlineDeleteWhite.svg"
                    alt="delete icon"
                    width="35"
                    height="35"
                  />
                </button>
              </form>
              <form
                action={async () => {
                  'use server';
                  await changeDoneStatus(task.id, false);
                  revalidatePath('/');
                  redirect('/');
                }}
                className="flex items-center"
              >
                <button type="submit">
                  <Image
                    src="/AiOutlineUndoWhite.svg"
                    alt="mark as unfinished"
                    width="35"
                    height="35"
                  />
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
