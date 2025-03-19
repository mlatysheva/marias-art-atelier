export interface SignupState {
  errors?: {
    firstName?: string[],
    lastName?: string[],
    username?: string[],
    email?: string[],
    password?: string[],
  },
  error: string // Show the error returned from the server
};