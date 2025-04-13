'use client';

import styles from './InputAddress.module.css';
import { JSX, useEffect, useRef, useState } from 'react';
import InputAddressProps from './props.InputAddress';

let debounceTimer: NodeJS.Timeout;

const InputAddress = ({ placeholder, className, value, onChange }: InputAddressProps): JSX.Element => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) {
      setAddresses([]);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch('/api/geo/city', {
          method: 'POST',
          body: JSON.stringify({ input: value }),
        });

        const data = await res.json();
        const suggestions = data?.suggestions?.map((item: { value: string }) => item.value) || [];
        setAddresses(suggestions);
      } catch (err) {
        console.error('Ошибка при получении адресов:', err);
      }
    }, 300);
  }, [value]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setAddresses([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    if (onChange) {
      // Создаем искусственное событие для изменения значения
      const event = {
        target: { value: suggestion } as HTMLInputElement, // Указываем, что это элемент input
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event); // Вызываем onChange с этим событием
    }
    setAddresses([]);
  };

  return (
    <div className={styles.main} ref={containerRef}>
      <input placeholder={placeholder} onChange={onChange} type="text" value={value} className={`${styles.input} ${className}`} />
      {addresses.length > 0 && (
        <div className={`${styles.list} ${styles['list-active']}`}>
          {addresses.map((address, index) => (
            <div key={index} onClick={() => handleSuggestionClick(address)} className={styles.suggestion}>
              {address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputAddress;
