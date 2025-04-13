export interface AddressDadataI {
  region_kladr_id: string;
  region_with_type: string;
  region_type: string;
  region_type_full: string;
  region: string;

  city_fias_id: string | null;
  city_with_type: string | null;
  city_type: string | null;
  city_type_full: string | null;
  city: string | null;

  city_district_fias_id: string | null;
  city_district_kladr_id: string | null;
  city_district_with_type: string | null;
  city_district_type: string | null;
  city_district_type_full: string | null;
  city_district: string | null;

  settlement_fias_id: string | null;
  settlement_with_type: string | null;
  settlement_type: string | null;
  settlement_type_full: string | null;
  settlement: string | null;

  street_with_type: string;
  street_type: string;
  street_type_full: string;
  street: string;

  area_with_type: string;
  area_type: string;
  area_type_full: string;
  area: string;

  house_type: string;
  house_type_full: string;
  house: string;

  flat_type: string;
  flat_type_full: string;
  flat: string;

  block_type: string;
  block_type_full: string;
  block: string;
}

export interface AddressResponseDadataI {
  suggestions: Array<ResultDadataI>;
}

export interface ResultDadataI {
  value: string;
  unrestricted_value: string;
  data: AddressDadataI | null;
}
