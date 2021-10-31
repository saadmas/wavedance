import * as React from 'react';

interface InputCardProps {
  title: string;
  onSubmit: (input: string) => void;
  placeholder?: string;
  maxLength?: number;
  withNextButton?: boolean;
}

const InputCard = ({}: InputCardProps) => {
  return null;
};

export default InputCard;
