
import React from 'react';
import { HiringCompany, ServiceProvider } from './types';

export const SERVICE_CATEGORIES = [
  { id: 'ac', name: 'AC Repair', type: 'ac', icon: '❄️', featured: true },
  { id: 'electrician', name: 'Electrician', type: 'electrician', icon: '🔌', featured: true },
  { id: 'plumber', name: 'Plumber', type: 'plumber', icon: '🚰', featured: true },
  { id: 'tailor', name: 'Tailor / Stitching', type: 'tailor', icon: '👕', featured: true },
  { id: 'press', name: 'Press / Ironing', type: 'press', icon: '🧺', featured: true },
  { id: 'cleaning', name: 'Home Cleaning', type: 'cleaning', icon: '🧹', featured: true },
  { id: 'tutor', name: 'Home Tutor', type: 'tutor', icon: '👨‍🏫', featured: true },
  { id: 'mobile', name: 'Mobile Repair', type: 'mobile', icon: '📱', featured: true },
];

export const JOB_CATEGORIES = [
  'Delivery', 'Sales', 'BPO', 'Teacher', 'Security Guard', 'Driver', 'Cooking', 'Office Boy',
  'Helper', 'Counter Staff', 'Cleaner', 'Packing Staff', 'Billing Staff'
];

export const SHOP_CATEGORIES = [
  'Garment Shop', 'Medical Store', 'Grocery / Kirana', 'Mobile Shop', 'Electronics Shop', 
  'Restaurant / Food Stall', 'Salon / Beauty', 'Repair Shop', 'Stationery', 'Other'
];

export const FINANCIAL_SERVICES = [
  { id: 'health', title: 'Health Insurance', text: 'Cashless treatment for your family.', icon: '🏥' },
  { id: 'life', title: 'Life Insurance', text: 'Secure the future of your loved ones.', icon: '🛡️' },
  { id: 'bike', title: 'Bike/Car Insurance', text: 'Instant policy with zero paperwork.', icon: '🏍️' },
  { id: 'biz-loan', title: 'Small Business Loan', text: 'Expand your shop with low interest.', icon: '🏪' },
  { id: 'edu-loan', title: 'Education Loan', text: 'Support your child’s bright future.', icon: '🎓' },
  { id: 'pers-loan', title: 'Personal Loan', text: 'Quick funds for your personal needs.', icon: '💰' },
];

export const MOCK_HIRING_COMPANIES: HiringCompany[] = [
  { id: 'c1', name: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com', link: '#', visible: true, order: 1 },
  { id: 'c2', name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.in', link: '#', visible: true, order: 2 },
  { id: 'c3', name: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com', link: '#', visible: true, order: 3 },
  { id: 'c4', name: 'Delhivery', logo: 'https://logo.clearbit.com/delhivery.com', link: '#', visible: true, order: 4 },
  { id: 'c5', name: 'Jio', logo: 'https://logo.clearbit.com/jio.com', link: '#', visible: true, order: 5 },
  { id: 'c6', name: 'Uber', logo: 'https://logo.clearbit.com/uber.com', link: '#', visible: true, order: 6 },
];

// Added MOCK_PROVIDERS to fix the missing export error in UserDashboard.tsx
export const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    serviceType: 'Electrician',
    rating: 4.8,
    experience: '10 Years',
    mobile: '9876543210',
    location: 'Rohini, Delhi',
    verified: true
  },
  {
    id: 'p2',
    name: 'Amit Sharma',
    serviceType: 'AC Repair',
    rating: 4.7,
    experience: '5 Years',
    mobile: '9876543211',
    location: 'Pitampura, Delhi',
    verified: true
  },
  {
    id: 'p3',
    name: 'Suman Devi',
    serviceType: 'Tailor / Stitching',
    rating: 4.9,
    experience: '12 Years',
    mobile: '9876543212',
    location: 'Dwarka, Delhi',
    verified: true
  }
];

export const MOCK_JOBS: any[] = [
  {
    id: '1',
    companyName: 'Flipkart Logistics',
    title: 'Delivery Executive',
    description: 'Looking for delivery partners in Delhi area. Daily payouts available.',
    category: 'Delivery',
    salary: '₹18,000 - ₹25,000',
    location: 'New Delhi',
    type: 'Full Time',
    status: 'APPROVED',
    createdAt: Date.now(),
    employerType: 'Company'
  },
  {
    id: '2',
    companyName: 'Garg Kirana Store',
    title: 'Counter Staff',
    description: 'Biling and customer handling for a busy grocery shop.',
    category: 'Billing Staff',
    salary: '₹12,000 - ₹15,000',
    location: 'Chandigarh',
    type: 'Part Time',
    status: 'APPROVED',
    createdAt: Date.now(),
    employerType: 'Shop',
    shopCategory: 'Grocery / Kirana',
    dutyTime: '10 AM - 6 PM',
    weeklyOff: 'Tuesday'
  }
];
