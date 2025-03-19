"use server";

import { redirect } from 'next/navigation';
import { post } from '../../shared/utils/fetch';
import { revalidatePath } from 'next/cache';
import { signupSchema } from './signup-validation-schema';
import { SignupState } from '../../shared/interfaces/signup-state.interface';

export default async function createUser(_prevState: SignupState, formData: FormData) {
  const signupFormData = Object.fromEntries(formData.entries());

  const validatedSignupFormData = signupSchema.safeParse(signupFormData);

  // Validate on the client side
  if (!validatedSignupFormData.success) {
    const formFieldErrors =
    validatedSignupFormData.error.flatten().fieldErrors;

    return {
      errors: {
        firstName: formFieldErrors?.firstName,
        lastName: formFieldErrors?.lastName,
        username: formFieldErrors?.username,
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
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