'use client';

import type { CoinTypes } from '@/types';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from '@/utils/cn';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
import { set } from 'date-fns';
import { Colombia } from '../icons/colombia';
// dynamic import
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view'),
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  className?: string;
  converterBody: (data: any) => void;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  getCoinValue,
  converterBody,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  type,
  ...rest
}: CoinInputTypes) {
  let [sendValue, setSendValue] = useState('');
  let [receiveValue, setReceiveValue] = useState('');
  const [inverted, setInverted] = useState(1);

  const [bodyConverted, setBodyConverted] = useState({
    send: 0,
    receive: 0,
    inverted: 1,
  });

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

  useEffect(() => {
    const initialValue = async () => {
      const body = { amount: 1, inverted: 1 };
      const response = await fetchConvert(body);

      if (response) {
        const formattedValue = parseFloat(response.converted).toLocaleString(
          'en-US',
        );
        const receiveElement = document.getElementById(
          'receive',
        ) as HTMLInputElement;

        const sendElement = document.getElementById('send') as HTMLInputElement;

        if (sendElement) {
          sendElement.value = '1';
        }

        setInverted(1);

        if (receiveElement) {
          setReceiveValue(formattedValue);
          receiveElement.value = formattedValue;
        }

        setBodyConverted({
          send: 1,
          receive: parseFloat(response.converted),
          inverted: inverted,
        });
      }
    };

    if (type == 'send') {
      setSendValue('1');

      initialValue();
    }
  }, []);

  useEffect(() => {
    converterBody(bodyConverted);
  }, [bodyConverted]);

  // useEffect(() => {
  //   const initialValue = async () => {
  //     const body = { amount: 1, inverted: 1 };
  //     const response = await fetchConvert(body);

  //     if (response) {
  //       const formattedValue = parseFloat(response.converted).toLocaleString(
  //         'en-US',
  //       );
  //       const receiveElement = document.getElementById(
  //         'receive',
  //       ) as HTMLInputElement;
  //       if (receiveElement) {
  //         receiveElement.value = formattedValue;
  //       }
  //     }
  //   };

  //   if (type == 'send') {
  //     setValue('1');

  //     initialValue();
  //   }
  // }, []);

  const handleSendChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let inputValue = event.target.value.replace(/,/g, '');

    if (inputValue.match(decimalPattern)) {
      setSendValue(inputValue);

      let body, response;

      if (inputValue.trim() === '') {
        inputValue = '0';
      }

      body = { amount: parseFloat(inputValue), inverted: 1 };
      setInverted(1);
      response = await fetchConvert(body);

      const inputElement = document.getElementById(
        'receive',
      ) as HTMLInputElement;

      if (inputElement && response) {
        inputElement.value = parseFloat(response.converted).toLocaleString(
          'en-US',
        );
      }

      setReceiveValue(parseFloat(response.converted).toLocaleString('en-US'));
    }
  };

  useEffect(() => {
    console.log(receiveValue.replace(/,/g, ''), sendValue.replace(/,/g, ''));

    setBodyConverted({
      send: parseFloat(sendValue),
      receive: parseFloat(receiveValue.replace(/,/g, '')),
      inverted: inverted,
    });
  }, [sendValue, receiveValue]);

  const handleReceiveChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let inputValue = event.target.value.replace(/,/g, ''); // Eliminar comas al formatear

    const formattedValue = parseFloat(inputValue).toLocaleString('en-US');
    setReceiveValue(formattedValue);

    let body, response;

    if (inputValue.trim() === '') {
      inputValue = '0';
      setReceiveValue('0');
    }

    body = { amount: parseFloat(inputValue), inverted: 0 };
    response = await fetchConvert(body);
    setInverted(0);

    const inputElement = document.getElementById('send') as HTMLInputElement;

    if (inputElement && response) {
      inputElement.value = response.converted;
    }

    setSendValue(response.converted);
  };

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
            Envias
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
        <div className="flex flex-1 text-right">
          <input
            id="send"
            type="text"
            value={sendValue}
            placeholder="0.0"
            inputMode="decimal"
            onChange={handleSendChange}
            className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
            {...rest}
          />
        </div>
      </div>

      <div
        className={cn(
          'group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
          className,
        )}
      >
        <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
            Recibes
          </span>
          <button
            onClick={() => setVisibleCoinList(true)}
            className="flex items-center font-medium outline-none dark:text-gray-100"
          >
            <Colombia></Colombia>
            <span className="ltr:ml-2 rtl:mr-2">COP </span>
            {/* <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" /> */}
          </button>
        </div>
        <div className="flex flex-1 text-right">
          <input
            id="receive"
            type="text"
            value={receiveValue}
            placeholder="0.0"
            inputMode="decimal"
            onChange={handleReceiveChange}
            className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
            {...rest}
          />
        </div>
      </div>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
