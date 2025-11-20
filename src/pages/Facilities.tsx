import { useState } from "react";
import { Plus, Building2, Search, MapPin, Users, DollarSign, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockFacilities = [
  {
    id: "1",
    name: "Hội trường tầng 1",
    type: "hoi_truong",
    capacity: 200,
    pricePerHour: 500000,
    residentPrice: 0,
    status: "available",
    description: "Hội trường rộng tầng 1, phù hợp tổ chức đám cưới, sự kiện lớn và các hoạt động sinh hoạt chung của tổ dân phố",
    images: ["https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=500"],
    amenities: ["Sân khấu", "Hệ thống âm thanh lớn", "Màn hình LED", "Điều hòa", "Bàn ghế 200 chỗ", "Đèn sân khấu"],
    area: 240,
    floor: "Tầng 1",
  },
  {
    id: "2",
    name: "Phòng họp A - Tầng 2",
    type: "phong_chuc_nang",
    capacity: 40,
    pricePerHour: 200000,
    residentPrice: 0,
    status: "available",
    description: "Phòng họp tầng 2 dành cho các cuộc họp, sinh hoạt chi bộ, tập huấn",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"],
    amenities: ["Máy chiếu", "Bảng viết", "Điều hòa", "WiFi", "Bàn ghế họp"],
    area: 80,
    floor: "Tầng 2",
  },
  {
    id: "3",
    name: "Phòng sinh hoạt văn nghệ",
    type: "phong_chuc_nang",
    capacity: 30,
    pricePerHour: 150000,
    residentPrice: 0,
    status: "available",
    description: "Phòng dành cho các hoạt động văn nghệ, múa hát, luyện tập",
    images: ["https://images.unsplash.com/photo-1598623803034-a9b2c2df0b63?w=500"],
    amenities: ["Gương lớn", "Sàn gỗ", "Loa Bluetooth", "Điều hòa"],
    area: 60,
    floor: "Tầng 2",
  },
  {
    id: "4",
    name: "Sân thể thao ngoài trời",
    type: "san_the_thao",
    capacity: 50,
    pricePerHour: 100000,
    residentPrice: 0,
    status: "available",
    description: "Sân đa năng cho các hoạt động thể thao: cầu lông, bóng chuyền, thể dục buổi sáng",
    images: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500"],
    amenities: ["Đèn chiếu sáng", "Lưới cầu lông", "Ghế ngồi", "Khu vực để đồ"],
    area: 300,
    floor: "Sân ngoài",
  },
];

const statusConfig = {
  available: { label: "Sẵn sàng", color: "bg-success text-success-foreground" },
  occupied: { label: "Đang sử dụng", color: "bg-warning text-warning-foreground" },
  maintenance: { label: "Bảo trì", color: "bg-destructive text-destructive-foreground" },
};

const typeLabels = {
  hoi_truong: "Hội trường",
  phong_chuc_nang: "Phòng chức năng",
  san_van_hoa: "Sân văn hóa",
  san_the_thao: "Sân thể thao",
};

export default function Facilities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredFacilities = mockFacilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || facility.type === typeFilter;
    const matchesStatus = statusFilter === "all" || facility.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cơ sở vật chất</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý các cơ sở vật chất và tiện ích
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm cơ sở vật chất..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="hoi_truong">Hội trường</SelectItem>
                <SelectItem value="phong_chuc_nang">Phòng chức năng</SelectItem>
                <SelectItem value="san_van_hoa">Sân văn hóa</SelectItem>
                <SelectItem value="san_the_thao">Sân thể thao</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="available">Sẵn sàng</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Facilities Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={facility.images[0]}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  statusConfig[facility.status as keyof typeof statusConfig].color
                }`}
              >
                {statusConfig[facility.status as keyof typeof statusConfig].label}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{facility.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {typeLabels[facility.type as keyof typeof typeLabels]}
                  </p>
                </div>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{facility.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{facility.capacity} người</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{facility.floor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{(facility.pricePerHour / 1000).toFixed(0)}k/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{facility.area}m²</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {facility.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {facility.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{facility.amenities.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" size="sm">
                  Chi tiết
                </Button>
                <Button className="flex-1" size="sm">
                  Đặt lịch
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Không tìm thấy cơ sở vật chất nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
