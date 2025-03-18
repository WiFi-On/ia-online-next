export interface LeadProps {
  lead: Lead;
}

export interface LeadsProps {
  leads: LeadService[];
}

export interface Lead {
  name: string;
  address: string;
  phone: string;
  comments: string[];
  status:
    | { id: 0; name: "new"; ru_name: "Новая заявка" }
    | { id: 1; name: "noContact"; ru_name: "Недозвон" }
    | { id: 2; name: "pending"; ru_name: "Отложена" }
    | { id: 3; name: "scheduled"; ru_name: "Назначена" }
    | { id: 4; name: "ready"; ru_name: "Готова" }
    | { id: 5; name: "paid"; ru_name: "Оплачено" }
    | { id: 6; name: "refusal"; ru_name: "Отказ" }
    | Status;
  services: number[];
  price?: Price;
  dateAndTimeCreated: string;
  datePayment?: string;
  dateReady?: string;
}

export interface LeadService extends Lead {
  id: number;
}

export interface Status {
  id: number;
  name: string;
  ru_name: string;
}

interface Price {
  internet?: number;
  cleaning?: number;
  shipping?: number;
  total: number;
}
