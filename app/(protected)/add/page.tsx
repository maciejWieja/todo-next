import { addTask } from '@/app/lib/actions';

export default function Page() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="py-[40px] px-[75px] w-[540px] bg-purple rounded-[70px] border-4 border-black mt-[50px] ml-[200px]">
        <form
          action={addTask}
          className="flex flex-col items-center gap-[40px]"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            minLength={3}
            maxLength={128}
            required
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <textarea
            name="content"
            placeholder="Content"
            minLength={3}
            maxLength={512}
            required
            className="w-full h-[180px] pl-[20px] pt-[5px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <input
            type="datetime-local"
            name="endTime"
            required
            className="w-full h-[70px] pl-[20px] text-[32px] rounded-[12px] border-2 border-black"
          />
          <button
            type="submit"
            className="w-[320px] h-[80px] bg-blue-dark text-white rounded-full border-2 border-black text-[32px] font-bold"
          >
            Add
          </button>
        </form>
        <div className="absolute w-[1000px] h-[160px] bg-blue-dark rotate-[-50deg] right-[-300px] bottom-[100px]"></div>
      </div>
    </div>
  );
}
