
export enum UserRole {
  USER = 'USER',
  COMPANY = 'COMPANY',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMIN = 'ADMIN',
  STUDENT_PARTNER = 'STUDENT_PARTNER'
}

export type ServiceBookingStatus = 
  | 'Request Received' 
  | 'Partner Assigned' 
  | 'On The Way' 
  | 'Reached Location' 
  | 'Work Started' 
  | 'Completed';

export interface ServiceBooking {
  id: string;
  userId: string;
  providerId?: string;
  providerName?: string;
  serviceType: string;
  address: string;
  status: ServiceBookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  estimatedCharge: number;
  lat?: number;
  lng?: number;
  createdAt: number;
}

export type CompanyType = 
  | 'Private Company' 
  | 'Small Business' 
  | 'Startup' 
  | 'Shop Owner' 
  | 'Franchise Outlet' 
  | 'Agency' 
  | 'Contractor' 
  | 'Individual Employer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile: string;
  location?: string;
  verified?: boolean;
  blocked?: boolean;
  createdAt: number;
  // User specific
  experience?: string;
  jobType?: 'Full Time' | 'Part Time';
  skills?: string[];
  // Company specific
  companyName?: string;
  ownerName?: string;
  hrContact?: string;
  companyType?: CompanyType;
  shopCategory?: string;
  // Provider specific
  businessName?: string;
  serviceCategory?: string;
  availableTimeSlot?: string;
  // Student Partner specific
  collegeName?: string;
  course?: string;
  upiId?: string;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  category: string;
  salary: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Shift Based';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: number;
  employerType: 'Company' | 'Shop';
  shopCategory?: string;
  dutyTime?: string;
  weeklyOff?: string;
}

export interface StudentLead {
  id: string;
  partnerId: string;
  businessType: string;
  businessName: string;
  contactPerson: string;
  mobile: string;
  address: string;
  requirementType: string;
  description: string;
  salaryRange: string;
  urgency: string;
  status: 'Submitted' | 'Under Review' | 'Contacted' | 'In Process' | 'Completed';
  commission: number;
  createdAt: number;
}

// Added missing interface for HiringCompany as used in constants.tsx and AdminDashboard.tsx
export interface HiringCompany {
  id: string;
  name: string;
  logo: string;
  link: string;
  visible: boolean;
  order: number;
}

// Added missing interface for ServiceProvider as used in constants.tsx
export interface ServiceProvider {
  id: string;
  name: string;
  serviceType: string;
  rating: number;
  experience: string;
  mobile: string;
  location: string;
  verified: boolean;
}

// Added missing interface for FinancialLead as requested by AdminDashboard.tsx
export interface FinancialLead {
  id: string;
  userId: string;
  userName: string;
  productType: string;
  mobile: string;
  city: string;
  incomeRange: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: number;
}
