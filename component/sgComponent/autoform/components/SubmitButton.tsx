import { Button } from '@sg/ui';
import React from 'react';

export const SubmitButton: React.FC<{ children: React.ReactNode } & React.ComponentProps<typeof Button>> = ({ children, ...props }) => (
  <Button type="submit" {...props}>
    {children}
  </Button>
);
