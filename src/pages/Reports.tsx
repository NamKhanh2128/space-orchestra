import { useState } from "react";
import { Download, Calendar, TrendingUp, DollarSign, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const revenueData = [
  { month: "T1", revenue: 42, bookings: 65, lastYear: 35 },
  { month: "T2", revenue: 38, bookings: 59, lastYear: 40 },
  { month: "T3", revenue: 45, bookings: 80, lastYear: 38 },
  { month: "T4", revenue: 48, bookings: 81, lastYear: 42 },
  { month: "T5", revenue: 50, bookings: 96, lastYear: 45 },
  { month: "T6", revenue: 48.5, bookings: 90, lastYear: 48 },
];

const facilityTypeData = [
  { name: "Hội trường", value: 35, revenue: 28500000 },
  { name: "Sân thể thao", value: 28, revenue: 18200000 },
  { name: "Phòng họp", value: 20, revenue: 12500000 },
  { name: "Bể bơi", value: 17, revenue: 15800000 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [reportType, setReportType] = useState("revenue");

  const handleExport = (format: string) => {
    console.log(`Exporting report as ${format}`);
    // Implement export logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo</h1>
          <p className="text-muted-foreground mt-1">
            Phân tích và thống kê chi tiết
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Xuất PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              className="flex-1"
            />
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Doanh thu</SelectItem>
                <SelectItem value="bookings">Lượt đặt</SelectItem>
                <SelectItem value="facilities">Cơ sở vật chất</SelectItem>
                <SelectItem value="users">Người dùng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng doanh thu</p>
                <p className="text-2xl font-bold mt-1">₫48.5M</p>
                <p className="text-xs text-success mt-1">+18.2% so với tháng trước</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tổng đơn đặt</p>
                <p className="text-2xl font-bold mt-1">248</p>
                <p className="text-xs text-success mt-1">+12.5% so với tháng trước</p>
              </div>
              <Calendar className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tỷ lệ lấp đầy</p>
                <p className="text-2xl font-bold mt-1">78%</p>
                <p className="text-xs text-success mt-1">+5.3% so với tháng trước</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Khách hàng mới</p>
                <p className="text-2xl font-bold mt-1">45</p>
                <p className="text-xs text-success mt-1">+8.7% so với tháng trước</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>So sánh doanh thu (Năm nay vs Năm trước)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Năm nay (M₫)" />
                <Bar dataKey="lastYear" fill="hsl(var(--muted))" name="Năm trước (M₫)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Facility Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo loại cơ sở</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={facilityTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {facilityTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng đặt lịch</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Lượt đặt"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>Top cơ sở theo doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facilityTypeData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}
                    >
                      <Building2
                        className="h-5 w-5"
                        style={{ color: COLORS[index % COLORS.length] }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.value} lượt đặt</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {(item.revenue / 1000000).toFixed(1)}M₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
