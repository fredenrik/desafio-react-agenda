import { type PropsWithChildren, useEffect, useState } from 'react';
import { Button, Form, type FormInstance } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/button';

interface SubmitButtonProps extends BaseButtonProps {
  form: FormInstance;
  onClick: () => void;
}

export const SubmitButton = ({
  form,
  onClick,
  children,
  ...rest
}: PropsWithChildren<SubmitButtonProps>) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" onClick={onClick} disabled={!submittable} {...rest}>
      {children}
    </Button>
  );
};
