import { Client } from './client';

export type CommunicationType = 'email' | 'sms' | 'whatsapp' | 'phone' | 'secure_message';
export type CommunicationStatus = 'unread' | 'read' | 'urgent' | 'archived';

export interface Communication {
  id: string;
  type: CommunicationType;
  client: Client;
  content: string;
  status: CommunicationStatus;
  createdAt: Date;
  updatedAt: Date;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  metadata?: {
    duration?: number; // Pour les appels
    phoneNumber?: string;
    emailSubject?: string;
    direction: 'incoming' | 'outgoing';
  };
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  type: CommunicationType;
  subject?: string;
  content: string;
  variables: string[];
}