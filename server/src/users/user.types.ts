export interface IUser {
  email: string;
  userName: string;
  password: string;
}

// 2️⃣ Interface for instance methods
export interface UserMethods {
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}