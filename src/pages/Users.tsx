import { useState } from "react";
import { Plus, Search, Mail, Phone, Shield, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    role: "admin",
    status: "active",
    isResident: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    role: "resident",
    status: "active",
    isResident: true,
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0912345678",
    role: "guest",
    status: "active",
    isResident: false,
    createdAt: "2024-01-17",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "staff",
    status: "active",
    isResident: false,
    createdAt: "2024-01-18",
  },
];

const roleLabels = {
  admin: { label: "Quản trị viên", color: "bg-primary text-primary-foreground" },
  manager: { label: "Quản lý", color: "bg-accent text-accent-foreground" },
  staff: { label: "Nhân viên", color: "bg-secondary text-secondary-foreground" },
  resident: { label: "Cư dân", color: "bg-success text-success-foreground" },
  guest: { label: "Khách", color: "bg-muted text-muted-foreground" },
};

const statusLabels = {
  active: { label: "Hoạt động", color: "bg-success text-success-foreground" },
  inactive: { label: "Tạm dừng", color: "bg-warning text-warning-foreground" },
  blacklisted: { label: "Cấm", color: "bg-destructive text-destructive-foreground" },
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tài khoản và quyền truy cập
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={roleLabels[user.role as keyof typeof roleLabels].color}>
                        <Shield className="h-3 w-3 mr-1" />
                        {roleLabels[user.role as keyof typeof roleLabels].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.isResident ? (
                        <Badge variant="outline" className="border-success text-success">
                          Cư dân
                        </Badge>
                      ) : (
                        <Badge variant="outline">Khách</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusLabels[user.status as keyof typeof statusLabels].color}>
                        {statusLabels[user.status as keyof typeof statusLabels].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Không tìm thấy người dùng nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
