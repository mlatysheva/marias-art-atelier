"use server";

import { redirect } from 'next/navigation';
import { post } from '../../shared/utils/fetch';
import { revalidatePath } from 'next/cache';
import { signupSchema } from './signup-validation-schema';
import { SignupState } from '../../shared/interfaces/signup-state.interface';
import z from 'zod';

export default async function createUser(_prevState: SignupState, formData: FormData) {
  const signupFormData = Object.fromEntries(formData.entries());

  const validatedSignupFormData = signupSchema.safeParse(signupFormData);

  // Validate on the client side
  if (!validatedSignupFormData.success) {
    const formFieldErrors2 =
    validatedSignupFormData.error.flatten().fieldErrors;
    const formFieldErrors = z.treeifyError(validatedSignupFormData.error);

    return {
      errors: {
        firstName: formFieldErrors?.properties?.firstName?.errors,
        lastName: formFieldErrors?.properties?.lastName?.errors,
        username: formFieldErrors?.properties?.username?.errors,
        email: formFieldErrors?.properties?.email?.errors,
        password: formFieldErrors?.properties?.password?.errors,
      },
      error: ''
    };
  }
  
  // Validate on the server side
  const { error } = await post("users", formData);

  if (error) {
    return { errors: {}, error };
  } 
  
  revalidatePath('/');
  
  // Redirect to the home page after successfully creating a user
  redirect('/');
}