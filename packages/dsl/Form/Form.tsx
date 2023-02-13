import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {}

interface FormProps extends PropsWithChildren {
  onSubmit: (values: object) => any;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      {/* <div>{JSON.stringify(methods.getValues())}</div> */}
    </FormProvider>
  );
};
