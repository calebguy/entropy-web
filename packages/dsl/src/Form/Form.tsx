import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {}

interface FormProps extends PropsWithChildren {
  onSubmit: (values: any) => Promise<any>;
  className?: string;
}

export const Form = ({ onSubmit, children, className }: FormProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
      {/* <div>{JSON.stringify(methods.getValues())}</div> */}
    </FormProvider>
  );
};
