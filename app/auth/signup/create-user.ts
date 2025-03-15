"use server";

import { redirect } from 'next/navigation';
import { post } from '../../shared/utils/fetch';
import { FormResponse } from '../../shared/interfaces/form-response.interface';

export default async function createUser(_prevState: FormResponse, formData: FormData) {
  const { error } = await post("users", formData);

  if (error) {
    return { error };
  }
  // Redirect to the home page after successfully creating a user
  redirect('/');
}