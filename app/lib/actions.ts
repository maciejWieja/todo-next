'use server';

import prisma from '@/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { auth, signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const UserSchema = z.object({
  email: z
    .string({
      required_error: 'Is required',
      invalid_type_error: 'Must be a string',
    })
    .email({
      message: 'Invalid',
    }),
  password: z
    .string({
      required_error: 'Is required',
      invalid_type_error: 'Must be a string',
    })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, {
      message: 'Min 8 characters, capital letter, special character, number',
    }),
  repeatedPassword: z.string({
    required_error: 'Is required',
  }),
});

type State = {
  errors?: {
    email?: string[];
    password?: string[];
    status?: string[];
    repeatedPassword?: string[];
  };
  message?: string | null;
};

export async function register(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedUserInfo = UserSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    repeatedPassword: formData.get('repeated_password'),
  });

  if (!validatedUserInfo.success) {
    return {
      errors: validatedUserInfo.error.flatten().fieldErrors,
      message: 'Failed to register',
    };
  }

  const { email, password, repeatedPassword } = validatedUserInfo.data;

  if (password !== repeatedPassword) {
    return {
      errors: {
        repeatedPassword: ['Must be the same'],
      },
      message: 'Failed to register',
    };
  }

  try {
    const userWithProvidedEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithProvidedEmail) {
      return {
        errors: {
          email: ['Already in use'],
        },
        message: 'Failed to register',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await signIn('credentials', { email, password, redirect: false });
  } catch (err) {
    return {
      message: `Some error with database: ${err}`,
    };
  }
  redirect('/');
}

export async function handleCredentialsLogIn(
  prevState: string | void,
  formData: FormData
): Promise<string | void> {
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    await signIn('credentials', { email, password, redirect: false });
  } catch (err) {
    return 'Failed to log in';
  }
  redirect('/');
}

export async function handleGoogleLogIn() {
  await signIn('google');
}

export async function handleLogOut() {
  await signOut();
}

export async function deleteTask(taskId: number) {
  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function changeDoneStatus(taskId: number, status: boolean) {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        done: status,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

const TaskSchema = z.object({
  title: z.string().min(3).max(128),
  content: z.string().min(3).max(512),
  endTime: z.string().datetime(),
});

export async function addTask(formData: FormData) {
  const localEndTime = new Date(formData.get('endTime') as string);
  const utcEndTime = localEndTime.toISOString();

  const validatedTask = TaskSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    endTime: utcEndTime,
  });

  if (!validatedTask.success) {
    console.log(validatedTask.error.flatten().fieldErrors);
    return;
  }

  const { title, content, endTime } = validatedTask.data;

  const session = await auth();

  await prisma.task.create({
    data: {
      title,
      content,
      endTime,
      authorId: Number(session?.user?.id),
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function editTask(formData: FormData, taskId: number) {
  const localEndTime = new Date(formData.get('endTime') as string);
  const utcEndTime = localEndTime.toISOString();

  const validatedTask = TaskSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    endTime: utcEndTime,
  });

  if (!validatedTask.success) {
    console.log(validatedTask.error.flatten().fieldErrors);
    return;
  }

  const { title, content, endTime } = validatedTask.data;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      content,
      endTime,
    },
  });

  revalidatePath(`/task/${taskId}`);
  redirect(`/task/${taskId}`);
}
