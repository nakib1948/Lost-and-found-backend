interface UserProfile {
  bio: string;
  age: number;
  image: string;
}

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  profile: UserProfile;
}
