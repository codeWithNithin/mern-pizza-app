export interface UserSchema {
  email: string;
  userName: string;
  password: string;
}

export interface UserResponse {
  email: string;
  userName: string;
  _id: string;
}

// 2️⃣ Interface for instance methods
export interface UserMethods {
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: {
    email: string;
    userName: string;
    _id?: string;
  };
}
