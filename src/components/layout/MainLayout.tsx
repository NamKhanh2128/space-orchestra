import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 lg:pl-64">
        <Header />
        <main className="flex-1 p-4 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
