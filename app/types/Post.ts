export type PostType = {
  id: string;
  title: string;
  updatedAt?: string;
  createdAt: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
    subscriptionStatus?: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    message: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
  likes?: [];
};
