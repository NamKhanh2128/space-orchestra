import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive">403</h1>
          <p className="mt-2 text-muted-foreground">
            Bạn không có quyền truy cập trang này
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
