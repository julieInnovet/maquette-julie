import { Animal } from './animal';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  animals: Animal[];
  lastInteraction: Date;
  lastAppointment: Date | null;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  consents: {
    marketing: boolean;
    dataProcessing: boolean;
    photos: boolean;
  };
  notes: ClientNote[];
  stats: {
    totalVisits: number;
    canceledAppointments: number;
    totalSpent: number;
  };
}

export interface ClientNote {
  id: string;
  type: 'call' | 'email' | 'sms' | 'internal';
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  weight: number;
  careStatus: 'up_to_date' | 'pending' | 'overdue';
  lastCheckup: Date | null;
  medicalHistory: {
    id: string;
    date: Date;
    type: string;
    description: string;
    veterinarian: string;
  }[];
}