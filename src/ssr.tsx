import { StartServer } from '@tanstack/react-start/server';
import { createRouter } from './router';

export function render(url: string) {
  const router = createRouter();
  return <StartServer router={router} url={url} />;
}
