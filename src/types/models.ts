export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface OfferedService {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  offeredService: OfferedService;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: number;
  status: string;
  paid: boolean;
  timeSlot: TimeSlot;
  customer: Customer;
}

