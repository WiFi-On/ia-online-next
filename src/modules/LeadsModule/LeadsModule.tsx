'use client';

import styles from './LeadsModule.module.css';

import Leads from '@/components/Leads/Leads';
import Filter from '@/components/Filter/Filter';

import { Option } from '@/interfaces/Filter/Filter.intreface';
import { LeadService } from '@/interfaces/Lead/Lead.interface';
import { Value } from '@/interfaces/Calendar/Calendar.intreface';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const LeadsModule = () => {
  const router = useRouter();
  const [date, setDate] = useState<Value>([new Date('2025-01-01'), null]);
  const [servicesState, setServicesState] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [leads, setLeads] = useState<LeadService[]>([]);
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const lastElement = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const options: Option[] = [
    { id: -1, value: 'all', name: 'Все' },
    { id: 0, value: 'new', name: 'Новая заявка' },
    { id: 1, value: 'noContact', name: 'Недозвон' },
    { id: 2, value: 'pending', name: 'Отложена' },
    { id: 3, value: 'scheduled', name: 'Назначена' },
    { id: 4, value: 'ready', name: 'Готова' },
    { id: 5, value: 'paid', name: 'Оплачено' },
    { id: 6, value: 'refusal', name: 'Отказ' },
    { id: 7, value: 'appointment_control', name: 'Контроль назначения' },
  ];

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleServicesChange = (newServices: number) => {
    if (servicesState.includes(newServices)) {
      setServicesState(servicesState.filter((service) => service !== newServices));
    } else {
      setServicesState([...servicesState, newServices]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  const [isLoading, setIsLoading] = useState(false);

  const getLeads = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      let start_date = '';
      let end_date = '';

      if (Array.isArray(date)) {
        start_date = date[0] ? date[0].toISOString().split('T')[0] : '';
        end_date = date[1] ? date[1].toISOString().split('T')[0] : '';
      } else if (date instanceof Date) {
        start_date = date.toISOString().split('T')[0];
        end_date = date.toISOString().split('T')[0];
      }

      const query = new URLSearchParams({
        start_date,
        end_date,
        services: servicesState.join(','),
        ...(selectedOption && selectedOption.id !== -1 && { status_id: selectedOption.id.toString() }),
        limit: limit.toString(),
        offset: offset.toString(),
        search,
      }).toString();

      const res = await fetch(`/api/leads?${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data = await res.json();

      if (offset === 0) {
        setLeads(data.leads);
      } else {
        setLeads((prev) => [...prev, ...data.leads]);
      }

      if (data.leads.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // При изменении фильтров сбрасываем offset и данные
  useEffect(() => {
    setOffset(0);
    setLeads([]);
    setHasMore(true);
  }, [date, servicesState, search, selectedOption]);

  // Подгрузка данных при изменении offset или фильтров
  useEffect(() => {
    getLeads();
  }, [offset, date, servicesState, search, selectedOption]);

  // Интерсекшн обсервер
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setOffset((prev) => prev + limit);
      }
    });

    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }

    return () => observer.current?.disconnect();
  }, [leads, hasMore]);

  return (
    <div className={styles.main}>
      <Filter
        options={options}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        dateRange={date}
        handleDateChange={handleDateChange}
        services={servicesState}
        handleServicesChange={handleServicesChange}
        searchText={search}
        handleSearchChange={handleSearchChange}
      />
      <Leads leads={leads} />
      <div ref={lastElement}></div>
    </div>
  );
};

export default LeadsModule;
