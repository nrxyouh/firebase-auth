import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: ReactNode;
  user: unknown;
}

export const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  return user ? <>{children}</> : <Navigate to="/" replace />;
};