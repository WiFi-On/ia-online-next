export interface PayloadAccessI {
  user_id: number;
  exp: number;
  roles: string[];
  name: string;
  email: string;
  phone_number: string;
  city: string;
  telegram: string;
  referral_code: string;
  referrals: referralI[];
  statistic: statisticI;
}

export interface PayloadRefreshI {
  user_id: number;
  exp: number;
}

export interface referralI {
  id: number;
  name: string;
  phone_number: string;
  city: string;
  active: boolean;
}

interface statisticI {
  cleaning: number;
  internet: number;
  referrals: number;
  shipping: number;
  total: number;
}
