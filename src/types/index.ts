export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff' | 'resident' | 'guest';
  status: 'active' | 'inactive' | 'blacklisted';
  avatar?: string;
  createdAt: string;
  isResident: boolean;
  balance?: number;
  violations?: number;
}

export interface Facility {
  id: string;
  name: string;
  type: 'hall' | 'room' | 'field' | 'court' | 'pool' | 'gym';
  capacity: number;
  pricePerHour: number;
  residentPrice: number;
  description: string;
  images: string[];
  amenities: string[];
  status: 'available' | 'maintenance' | 'occupied';
  maintenanceHistory: MaintenanceRecord[];
  area: number;
  floor?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  description: string;
  cost: number;
  performedBy: string;
  nextScheduled?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  status: 'working' | 'broken' | 'maintenance' | 'retired';
  location: string;
  facilityId?: string;
  qrCode: string;
  serialNumber: string;
  warrantyExpiry?: string;
  maintenanceHistory: AssetMaintenanceRecord[];
}

export interface AssetMaintenanceRecord {
  id: string;
  date: string;
  type: 'repair' | 'inspection' | 'replacement';
  description: string;
  cost: number;
  performedBy: string;
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  userId: string;
  userName: string;
  userEmail: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled' | 'checked-in';
  purpose: string;
  participants: number;
  totalPrice: number;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  daysOfWeek?: number[];
  endDate: string;
  occurrences?: number;
}

export interface BookingFormData {
  facilityId: string;
  startTime: string;
  endTime: string;
  purpose: string;
  participants: number;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  revenue: number;
  occupancyRate: number;
  pendingApprovals: number;
  totalFacilities: number;
  totalAssets: number;
  totalUsers: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface FacilityUsageData {
  name: string;
  bookings: number;
  revenue: number;
  hours: number;
}
