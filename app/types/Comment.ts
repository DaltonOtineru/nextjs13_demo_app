export type CommentType = {
  comments?: {
    createdAt: string;
    id: string;
    message: string;
    postId: string;
    title?: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  };
};
