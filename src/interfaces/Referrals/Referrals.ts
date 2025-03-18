export interface ReferralProps {
  name: string;
  phone: string;
  city: string;
  level: string;
  status: string;
}

export interface Referrals {
  referrals: ReferralProps[];
}

export interface ReferralURLProps {
  url: string;
}
