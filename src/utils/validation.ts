import type { ShippingAddress } from '../types/order';

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export function validateShippingAddress(address: ShippingAddress): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!address.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (address.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!address.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(address.email.trim())) {
    errors.email = 'Enter a valid email address (e.g. name@example.com)';
  }

  // Indian phone validation (10 digits starting with 6, 7, 8, or 9)
  const phoneClean = address.phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!address.phone.trim()) {
    errors.phone = 'Mobile number is required';
  } else if (!phoneRegex.test(phoneClean)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number';
  }

  if (!address.addressLine.trim()) {
    errors.addressLine = 'Street address / House number is required';
  } else if (address.addressLine.trim().length < 5) {
    errors.addressLine = 'Please provide a complete address';
  }

  if (!address.city.trim()) {
    errors.city = 'City is required';
  }

  if (!address.state.trim()) {
    errors.state = 'State is required';
  }

  // Indian PIN code: 6 digits, first digit non-zero
  const pinClean = address.pinCode.trim();
  const pinRegex = /^[1-9][0-9]{5}$/;
  if (!pinClean) {
    errors.pinCode = 'PIN code is required';
  } else if (!pinRegex.test(pinClean)) {
    errors.pinCode = 'Enter a valid 6-digit PIN code (e.g., 560001)';
  }

  return errors;
}

export const INDIAN_STATES: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
];
