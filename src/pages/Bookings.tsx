import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Filter, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBookings = [
  {
    id: "1",
    facilityName: "Hội trường A",
    userName: "Nguyễn Văn A",
    userEmail: "nguyenvana@example.com",
    startTime: "2024-01-20T14:00:00",
    endTime: "2024-01-20T16:00:00",
    status: "approved",
    purpose: "Sự kiện sinh nhật",
    participants: 50,
    totalPrice: 2000000,
  },
  {
    id: "2",
    facilityName: "Sân tennis",
    userName: "Trần Thị B",
    userEmail: "tranthib@example.com",
    startTime: "2024-01-21T08:00:00",
    endTime: "2024-01-21T10:00:00",
    status: "pending",
    purpose: "Luyện tập",
    participants: 4,
    totalPrice: 400000,
  },
  {
    id: "3",
    facilityName: "Phòng họp B",
    userName: "Lê Văn C",
    userEmail: "levanc@example.com",
    startTime: "2024-01-22T13:00:00",
    endTime: "2024-01-22T15:00:00",
    status: "rejected",
    purpose: "Họp dự án",
    participants: 10,
    totalPrice: 500000,
    rejectionReason: "Đã có booking khác trùng giờ",
  },
];

const statusConfig = {
  pending: { label: "Chờ duyệt", icon: Clock, color: "bg-warning text-warning-foreground" },
  approved: { label: "Đã duyệt", icon: CheckCircle2, color: "bg-success text-success-foreground" },
  rejected: { label: "Từ chối", icon: XCircle, color: "bg-destructive text-destructive-foreground" },
  completed: { label: "Hoàn thành", icon: CheckCircle2, color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Đã hủy", icon: AlertCircle, color: "bg-muted text-muted-foreground" },
};

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý đặt lịch</h1>
          <p className="text-muted-foreground mt-1">
            Xem và quản lý các đơn đặt lịch
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Đặt lịch mới
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên cơ sở hoặc người đặt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => {
          const StatusIcon = statusConfig[booking.status as keyof typeof statusConfig].icon;
          const statusClass = statusConfig[booking.status as keyof typeof statusConfig].color;
          const statusLabel = statusConfig[booking.status as keyof typeof statusConfig].label;

          return (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.facilityName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.userName} • {booking.userEmail}
                        </p>
                      </div>
                      <Badge className={statusClass}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusLabel}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(booking.startTime).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(booking.startTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(booking.endTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">Mục đích: {booking.purpose}</p>
                      <p className="text-muted-foreground">
                        Số người tham gia: {booking.participants}
                      </p>
                      {booking.rejectionReason && (
                        <p className="text-destructive mt-2">
                          Lý do từ chối: {booking.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {booking.totalPrice.toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Từ chối
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Duyệt
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Không tìm thấy đơn đặt lịch nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
