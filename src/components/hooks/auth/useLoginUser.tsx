import { LoginFieldType } from "@/components/organisms/auth/LoginForm";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useLoginUser() {
  const URL = import.meta.env.VITE_API_URL;

  const { error, isSuccess, isPending, mutate, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFieldType) => {
      return await axiosInstance.post(`${URL}/login/`, data);
    },
  });

  return { mutate, error, isSuccess, isPending, data };
}
