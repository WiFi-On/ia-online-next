export interface GetLeadsRequest {
  limit: number;
  offset: number;

  status_id?: number;
  start_date?: string;
  end_date?: string;
  user_id?: string;
  is_internet?: boolean;
  is_shipping?: boolean;
  is_cleaning?: boolean;
  search?: string;
}

export interface LeadAddRequest {
  name: string;
  phone_number: string;
  address: string;
  comment?: string;
  is_internet?: boolean;
  is_shipping?: boolean;
  is_cleaning?: boolean;
}

export interface Lead {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  comments?: string[];
  created_at: string;
  completed_at?: string;
  payment_at?: string;
}
