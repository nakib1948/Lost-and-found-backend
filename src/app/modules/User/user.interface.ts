interface UserProfile {
  bio: string;
  age: number;
}

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  profile: UserProfile;
}
