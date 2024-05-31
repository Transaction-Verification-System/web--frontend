import { LoginFieldType } from "@/components/organisms/auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLoginUser() {
  const URL = import.meta.env.VITE_API_URL;

  const { error, isSuccess, isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFieldType) => {
      return axios.post(`${URL}/login/`, data);
    },
  });

  return { mutate, error, isSuccess, isPending };
}
