export type Gender = "male" | "female" | "other";

export interface SignupData {
  name: string;
  nickname: string;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
}

export interface SignupProps {
  onSubmit: (data: SignupData) => void;
}
