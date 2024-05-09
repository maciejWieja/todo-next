import { auth } from '@/auth';
import prisma from '@/db';
import { formatDateForInput } from '../lib/helpers';
import { editTask } from '../lib/actions';

export default async function EditForm({ params }: { params: { id: string } }) {
  const session = await auth();

  const taskToEdit = await prisma.task.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (Number(session?.user?.id) !== taskToEdit?.authorId) {
    return <h1 className="m-[40px] text-[32px] font-bold">Do not cheat!</h1>;
  }

  if (taskToEdit.done) {
    return (
      <h1 className="m-[40px] text-[32px] font-bold">
        Restore this task from the archive
      </h1>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="py-[40px] px-[75px] w-[540px] bg-purple rounded-[70px] border-4 border-black mt-[50px] ml-[200px]">
        <form
          action={async (formData: FormData) => {
            'use server';
            await editTask(formData, +params.id);
          }}
          className="flex flex-col items-center gap-[40px]"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            minLength={3}
            maxLength={128}
            required
            defaultValue={taskToEdit.title}
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <textarea
            name="content"
            placeholder="Content"
            minLength={3}
            maxLength={512}
            required
            defaultValue={taskToEdit.content}
            className="w-full h-[180px] pl-[20px] pt-[5px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <input
            type="datetime-local"
            name="endTime"
            required
            defaultValue={formatDateForInput(taskToEdit.endTime)}
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <button
            type="submit"
            className="w-[320px] h-[80px] bg-blue-dark text-white rounded-full border-2 border-black text-[32px] font-bold"
          >
            Edit
          </button>
        </form>
        <div className="absolute w-[1000px] h-[160px] bg-blue-dark rotate-[-50deg] right-[-300px] bottom-[100px]"></div>
      </div>
    </div>
  );
}
