export interface SigninData {
  email: string;
  password: string;
}

export interface SigninProps {
  onSubmit: (data: SigninData) => void;
}
