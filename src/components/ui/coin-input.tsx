'use client';

import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from '@/utils/cn';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
// dynamic import
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view'),
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  className?: string;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  getCoinValue,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  type,
  ...rest
}: CoinInputTypes) {
  let [value, setValue] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(coinList[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);

  const fetchConvert = async (data: any) => {
    try {
      const response = await fetch(
        `/api/convert?amount=${data.amount}&inverted=${data.inverted}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result.response;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    if (inputValue.match(decimalPattern)) {
      setValue(inputValue);

      let param = { coin: selectedCoin.code, value: inputValue };
      getCoinValue && getCoinValue(param);

      if (typeof type === 'string') {
        let body, response, formattedValue;

        if (inputValue.trim() === '') {
          inputValue = '0';
        }

        if (type === 'send') {
          body = { amount: parseFloat(inputValue), inverted: 1 };
          response = await fetchConvert(body);

          const inputElement = document.getElementById(
            'receive',
          ) as HTMLInputElement;

          if (inputElement && response) {
            formattedValue = parseFloat(response.converted).toLocaleString(
              'en-US',
              {
                minimumFractionDigits: 2,
              },
            );
            inputElement.value = formattedValue;
          }
        } else if (type === 'receive') {
          body = { amount: parseFloat(inputValue), inverted: 0 };
          response = await fetchConvert(body);

          const inputElement = document.getElementById(
            'send',
          ) as HTMLInputElement;

          if (inputElement && response) {
            formattedValue = parseFloat(response.converted).toLocaleString(
              'en-US',
              {
                minimumFractionDigits: 2,
              },
            );
            inputElement.value = formattedValue;
          }
        }
      }

      console.log('Este es el input que se está alterando: ', type);
    }
  };

  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);
    setVisibleCoinList(false);
  }
  return (
    <>
      <div
        className={cn(
          'group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
          className,
        )}
      >
        <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
            {label}
          </span>
          <button
            onClick={() => setVisibleCoinList(true)}
            className="flex items-center font-medium outline-none dark:text-gray-100"
          >
            {selectedCoin?.icon}{' '}
            <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.code} </span>
            {/* <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" /> */}
          </button>
        </div>
        <div className="flex flex-1 flex-col text-right">
          <input
            id={type}
            type="text"
            value={value}
            placeholder="0.0"
            inputMode="decimal"
            onChange={handleOnChange}
            className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
            {...rest}
          />
          <span className="font-xs px-3 text-gray-400">
            = ${exchangeRate ? exchangeRate : '0.00'}
          </span>
        </div>
      </div>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
