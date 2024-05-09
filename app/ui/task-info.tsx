import { auth } from '@/auth';
import prisma from '@/db';
import { formatTimeDifference } from '../lib/helpers';
import clsx from 'clsx';
import Image from 'next/image';
import { changeDoneStatus, deleteTask } from '../lib/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function TaskInfo({ params }: { params: { id: string } }) {
  const session = await auth();

  const task = await prisma.task.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (Number(session?.user?.id) !== task?.authorId) {
    return <h1 className="m-[40px] text-[32px] font-bold">Do not cheat!</h1>;
  }

  if (task.done) {
    return (
      <h1 className="m-[40px] text-[32px] font-bold">
        Restore this task from the archive
      </h1>
    );
  }

  const { formattedTime, isLittleTime } = formatTimeDifference(task.endTime);

  return (
    <div className="relative grid grid-cols-[390px_auto_1fr] gap-[100px] w-full h-full p-[60px] overflow-hidden">
      <div>
        <div className="font-bold text-[24px] mb-[40px]">Title</div>
        <div className="relative">
          <div className="absolute left-[90px] top-[-23px] w-[300px] h-[75px] bg-mint-dark"></div>
          <div className="relative text-[24px]">{task.title}</div>
        </div>
        <div className="font-bold text-[24px] mt-[60px] mb-[40px]">
          Description
        </div>
        <div className="relative">
          <div className="absolute left-[90px] top-[-23px] w-[300px] h-[75px] bg-mint-dark"></div>
          <div className="relative text-[24px]">{task.content}</div>
        </div>
      </div>
      <div>
        <div className="font-bold text-[24px] mb-[40px]">Time to end</div>
        <div
          className={clsx('text-[24px]', { 'text-pink-dark': isLittleTime })}
        >
          {formattedTime}
        </div>
      </div>
      <div className="flex flex-col gap-[60px]">
        <form
          action={async () => {
            'use server';
            await deleteTask(task.id);
            revalidatePath('/');
            redirect('/');
          }}
          className="ml-auto"
        >
          <button type="submit">
            <Image
              src="/AiOutlineDelete.svg"
              alt="delete icon"
              width="100"
              height="100"
            />
          </button>
        </form>
        <form
          action={async () => {
            'use server';
            await changeDoneStatus(task.id, true);
            revalidatePath('/');
            redirect('/');
          }}
          className="ml-auto"
        >
          <button type="submit">
            <Image
              src="/AiOutlineCheckCircle.svg"
              alt="mark as unfinished"
              width="100"
              height="100"
            />
          </button>
        </form>
        <Link href={`/edit/${task.id}`} className="z-10 ml-auto">
          <Image
            src="/AiOutlineEdit.svg"
            alt="mark as unfinished"
            width="100"
            height="100"
          />
        </Link>
      </div>
      <div className="absolute w-[1000px] h-[160px] bg-blue-dark rotate-[-50deg] right-[-300px] bottom-[100px]"></div>
    </div>
  );
}
