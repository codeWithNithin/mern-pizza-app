export type Credentials = {
  email: string;
  password: string;
};

export type RegisterCreds = {
  email: string;
  password: string;
  userName: string;
}

export type User = {
  _id: string;
  email: string;
  userName: string;
  role: string;
  createdAt: string;
};
