export type PatientStatus = 'active' | 'inactive' | 'archived';
export type CareStatus = 'up_to_date' | 'pending' | 'overdue';
export type Gender = 'male' | 'female';
export type DocumentType = 'radiography' | 'analysis' | 'certificate' | 'prescription' | 'surgery_report';

export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: Gender;
  birthDate: Date;
  weight: number;
  transponderNumber?: string;
  status: PatientStatus;
  careStatus: CareStatus;
  photo?: string;
  detentionAddress: {
    street: string;
    city: string;
    postalCode: string;
  };
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  medicalInfo: {
    allergies: string[];
    chronicConditions: string[];
    meatExclusion: boolean;
    meatExclusionHistory: {
      date: Date;
      reason: string;
      declaredBy: string;
    }[];
  };
  lastVisit?: Date;
  nextAppointment?: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: Date;
  type: 'consultation' | 'vaccination' | 'surgery' | 'treatment';
  description: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  documents: PatientDocument[];
  veterinarian: string;
}

export interface Vaccination {
  id: string;
  patientId: string;
  type: string;
  date: Date;
  nextDue: Date;
  batch: string;
  veterinarian: string;
  notes?: string;
}

export interface PatientDocument {
  id: string;
  patientId: string;
  type: DocumentType;
  name: string;
  url: string;
  date: Date;
  description?: string;
  uploadedBy: string;
}

export interface PatientStats {
  weightHistory: {
    date: Date;
    weight: number;
  }[];
  visitFrequency: {
    period: string;
    count: number;
  }[];
  commonDiagnoses: {
    diagnosis: string;
    count: number;
  }[];
}