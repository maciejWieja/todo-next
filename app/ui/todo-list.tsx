import { auth } from '@/auth';
import prisma from '@/db';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { changeDoneStatus, deleteTask } from '../lib/actions';
import { revalidatePath } from 'next/cache';

export default async function TodoList() {
  const session = await auth();

  const tasks = await prisma.task.findMany({
    where: {
      authorId: Number(session?.user?.id),
      done: false,
    },
    orderBy: {
      endTime: 'asc',
    },
  });

  if (tasks.length === 0) {
    return <h1 className="m-[40px] text-[32px] font-bold">Add new task!</h1>;
  }

  const now = new Date().getTime();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-[30px] gap-y-[40px] p-[30px]">
      {tasks.map((task) => {
        const isOutdated = now > task.endTime.getTime();

        return (
          <div
            key={task.id}
            className={clsx(
              'group relative border-[3px] border-black h-[200px] rounded-[12px] max-w-[300px]',
              {
                'bg-pink-dark': isOutdated,
                'bg-mint-light': !isOutdated,
              }
            )}
          >
            <Link href={`/task/${task.id}`}>
              <div className="w-full h-full overflow-y-auto pt-[20px] px-[20px] pb-[10px] font-bold text-[20px]">
                {task.title}
              </div>
            </Link>
            <div className="hidden group-hover:flex justify-center gap-[10px] absolute bottom-0 left-0 w-full h-[60px] bg-[#00000080]">
              <Link href={`/edit/${task.id}`} className="flex items-center">
                <Image
                  src="/AiOutlineEditWhite.svg"
                  alt="edit icon"
                  width="35"
                  height="35"
                />
              </Link>
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
                  await changeDoneStatus(task.id, true);
                  revalidatePath('/');
                }}
                className="flex items-center"
              >
                <button type="submit">
                  <Image
                    src="/AiOutlineCheckCircleWhite.svg"
                    alt="mark as done icon"
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
