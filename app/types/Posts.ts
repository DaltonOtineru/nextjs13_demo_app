export type PostsType = {
  key: string;
  avatar: string;
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
    email: string;
    subscriptionStatus?: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  likes?: [];
};
