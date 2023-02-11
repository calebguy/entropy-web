import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

interface FormProps {}

interface FormProps extends PropsWithChildren {
  onSubmit: () => any;
}

export const Form = ({ onSubmit }: FormProps) => {
  const { handleSubmit } = useForm();
  return <form onSubmit={handleSubmit(onSubmit)}></form>;
};
