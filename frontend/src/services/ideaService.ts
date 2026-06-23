import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export interface Idea {
  id: number;
  titulo: string;
  fecha: string;
}

export interface CreateIdeaPayload {
  titulo: string;
  fecha: string;
}

const QUERY_KEY = ['ideas'];

const fetchIdeas = async (): Promise<Idea[]> => {
  const { data } = await axiosInstance.get('/ideas');
  return data;
};

const createIdea = async (payload: CreateIdeaPayload): Promise<Idea> => {
  const { data } = await axiosInstance.post('/ideas', payload);
  return data;
};

const deleteIdea = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/ideas/${id}`);
};

export const useIdeas = () =>
  useQuery<Idea[]>({
    queryKey: QUERY_KEY,
    queryFn: fetchIdeas,
  });

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  return useMutation<Idea, Error, CreateIdeaPayload>({
    mutationFn: createIdea,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

//invalidatequeries es para no depender del cache anterior
export const useDeleteIdea = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteIdea,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};
