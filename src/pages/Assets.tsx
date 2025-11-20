import { useState } from "react";
import { Plus, Search, Package, QrCode, Wrench, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockAssets = [
  {
    id: "1",
    name: "Máy chiếu Sony VPL-FHZ75",
    category: "Thiết bị điện tử",
    purchaseDate: "2023-01-15",
    purchasePrice: 25000000,
    currentValue: 20000000,
    status: "working",
    location: "Hội trường A",
    qrCode: "ASSET-001",
    serialNumber: "SN-2023-001",
  },
  {
    id: "2",
    name: "Bộ âm thanh Bose",
    category: "Thiết bị âm thanh",
    purchaseDate: "2023-03-20",
    purchasePrice: 15000000,
    currentValue: 13000000,
    status: "working",
    location: "Hội trường A",
    qrCode: "ASSET-002",
    serialNumber: "SN-2023-002",
  },
  {
    id: "3",
    name: "Điều hòa Daikin 2HP",
    category: "Thiết bị làm mát",
    purchaseDate: "2022-06-10",
    purchasePrice: 12000000,
    currentValue: 8000000,
    status: "maintenance",
    location: "Phòng họp B",
    qrCode: "ASSET-003",
    serialNumber: "SN-2022-003",
  },
  {
    id: "4",
    name: "Bàn ghế hội trường (bộ 50)",
    category: "Nội thất",
    purchaseDate: "2023-05-01",
    purchasePrice: 30000000,
    currentValue: 27000000,
    status: "working",
    location: "Hội trường A",
    qrCode: "ASSET-004",
    serialNumber: "SN-2023-004",
  },
];

const statusConfig = {
  working: { label: "Hoạt động tốt", color: "bg-success text-success-foreground" },
  broken: { label: "Hỏng", color: "bg-destructive text-destructive-foreground" },
  maintenance: { label: "Đang bảo trì", color: "bg-warning text-warning-foreground" },
  retired: { label: "Đã thanh lý", color: "bg-muted text-muted-foreground" },
};

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tài sản & Kho</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tài sản và thiết bị
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nhập tài sản
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng tài sản</p>
                <p className="text-2xl font-bold mt-1">156</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hoạt động tốt</p>
                <p className="text-2xl font-bold mt-1 text-success">142</p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cần bảo trì</p>
                <p className="text-2xl font-bold mt-1 text-warning">14</p>
              </div>
              <Wrench className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng giá trị</p>
                <p className="text-2xl font-bold mt-1">₫2.1B</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm tài sản..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="working">Hoạt động tốt</SelectItem>
                <SelectItem value="maintenance">Đang bảo trì</SelectItem>
                <SelectItem value="broken">Hỏng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tài sản</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Ngày mua</TableHead>
                  <TableHead>Giá mua</TableHead>
                  <TableHead>Giá hiện tại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {asset.serialNumber}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        {asset.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(asset.purchaseDate).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {(asset.purchasePrice / 1000000).toFixed(1)}M₫
                    </TableCell>
                    <TableCell className="font-medium">
                      {(asset.currentValue / 1000000).toFixed(1)}M₫
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[asset.status as keyof typeof statusConfig].color}>
                        {statusConfig[asset.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Chi tiết
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

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Không tìm thấy tài sản nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
