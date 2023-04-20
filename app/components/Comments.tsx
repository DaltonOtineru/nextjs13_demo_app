'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchComments = async () => {
  const response = await axios.get('api/posts/getComments');
  return response.data;
};

export default function Comments() {
  const { data } = useQuery({
    queryFn: fetchComments,
    queryKey: ['comments'],
  });

  console.log(data);
  return <></>;
}
