import { isDev } from "./vars";

export default function Dev({ children }: { children: React.ReactNode }) {
  if (isDev()) {
    return <>{children}</>;
  }
  return null;
}
