export interface ReferralProps {
  name: string;
  phone: string;
  city: string;
  active: boolean;
}

export interface Referrals {
  referrals: ReferralProps[];
}

export interface ReferralURLProps {
  url: string;
}
