import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RegisterFormFieldType } from "@/components/organisms/auth/RegisterForm";

export default function useRegisterUser() {
  const URL = import.meta.env.VITE_API_URL;

  const { error, isSuccess, isPending, mutate , data } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterFormFieldType) => {
      return axios.post(`${URL}/register/`, data);
    },
  });

  return { mutate, error, isSuccess, isPending , data };
}
