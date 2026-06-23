import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export interface Idea {
  id: number;
  titulo: string;
  fecha: string;
}

export interface PaginatedIdeas {
  data: Idea[];
  current_page: number;
  last_page: number;
  total: number;
}

export interface CreateIdeaPayload {
  titulo: string;
  fecha: string;
}

const QUERY_KEY = ['ideas'];

const fetchIdeas = async (page: number): Promise<PaginatedIdeas> => {
  const { data } = await axiosInstance.get('/ideas', { params: { page } });
  return data;
};

const createIdea = async (payload: CreateIdeaPayload): Promise<Idea> => {
  const { data } = await axiosInstance.post('/ideas', payload);
  return data;
};

const deleteIdea = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/ideas/${id}`);
};

export const useIdeas = (page: number) =>
  useQuery<PaginatedIdeas>({
    queryKey: [...QUERY_KEY, page],
    queryFn: () => fetchIdeas(page),
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
