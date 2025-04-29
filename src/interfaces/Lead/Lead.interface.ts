export interface LeadProps {
  lead: Lead;
}

export interface LeadsProps {
  leads: LeadService[];
}

export interface Lead {
  id: number;
  userId: number;
  fio: string;
  address: string;
  status_id: number;
  phone_number: string;
  comments: Comment[];
  is_internet: boolean;
  is_cleaning: boolean;
  is_shipping: boolean;
  reward_internet: number;
  reward_cleaning: number;
  reward_shipping: number;
  created_at: string | null;
  completed_at: string | null;
  payment_at: string | null;
}

export interface Comment {
  id: number;
  is_manager: boolean;
  text: string;
  created_at: string;
}

export interface LeadService extends Lead {
  id: number;
}

export interface Status {
  id: number;
  name: string;
  ru_name: string;
}

// interface Price {
//   internet?: number;
//   cleaning?: number;
//   shipping?: number;
//   total: number;
// }
