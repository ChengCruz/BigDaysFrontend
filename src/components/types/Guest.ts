export interface Guest {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'Family Member' | 'Friend' | 'VIP' | 'Other'; // Add status field
}
