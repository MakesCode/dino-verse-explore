import { Input } from '@/components/ui/input';
import { AutoFormFieldProps } from '../react/types';
import React from 'react';

export const StringField: React.FC<AutoFormFieldProps> = ({ inputProps, error, id }) => {
  const { key, ...props } = inputProps;

  return <Input id={id} className={error ? 'border-destructive' : ''} {...props} />;
};
