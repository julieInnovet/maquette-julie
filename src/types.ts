// Add new appointment status types
export type AppointmentStatus = 
  | 'completed'  // Complété
  | 'corrected'  // Corrigé
  | 'sent'       // Envoyé
  | 'pending'    // For backward compatibility
  | 'scheduled'; // For backward compatibility

// Update existing types...