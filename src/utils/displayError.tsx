import { message } from "antd";
import { AxiosError } from "axios";

export default function displayError(error: AxiosError , key?: string) {
  const errorMessage: string = String((error?.response?.data as string[])?.[0] ?? error.message ?? "An Error Occoured");

  return message.error({
    content: errorMessage,
    key: key
  })
}
