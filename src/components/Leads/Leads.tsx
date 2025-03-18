import React from "react";
import styles from "./Leads.module.css";
import CardLead from "./CardLead/CardLead";
import { LeadsProps } from "@/interfaces/Lead/Lead.interface";

const Leads = ({ leads }: LeadsProps) => {
  return (
    <div className={styles.leads}>
      {leads.map((lead) => (
        <CardLead key={lead.id} lead={lead} />
      ))}
    </div>
  );
};

export default Leads;
