import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with real API
      const mockUser: User = {
        id: '1',
        email,
        name: 'Tổ trưởng',
        phone: '0123456789',
        role: 'to_truong',
        status: 'active',
        createdAt: new Date().toISOString(),
        isResident: true,
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'mock-token-' + Date.now());
      setUser(mockUser);
      
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng trở lại, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Mock API call - replace with real API
      const mockUser: User = {
        id: '2',
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: 'cu_dan',
        status: 'active',
        createdAt: new Date().toISOString(),
        isResident: true,
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'mock-token-' + Date.now());
      setUser(mockUser);
      
      toast({
        title: "Đăng ký thành công",
        description: "Tài khoản của bạn đã được tạo!",
      });
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setUser(null);
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
