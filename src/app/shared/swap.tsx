'use client';

import { useState, Fragment, useEffect, use } from 'react';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import cn from '@/utils/cn';
import RegistrationForm from '@/components/step-by-step/step-by-step';

import { Listbox } from '@/components/ui/listbox';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import HorizontalThreeDots from '@/components/icons/horizontal-three-dots';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useLayout } from '@/lib/hooks/use-layout';
import { Transition } from '@/components/ui/transition';
import { backendService } from '@/services/backend.service';
import { Configuration } from '@/interfaces/configuration.interface';

const sort = [
  { id: 1, name: 'DaviPlata' },
  { id: 2, name: 'Bancolombia' },
  { id: 3, name: 'Nequi' },
];

const SwapPage = () => {
  let [toggleCoin, setToggleCoin] = useState(false);
  const [selectedItem, setSelectedItem] = useState(sort[0]);
  const { layout } = useLayout();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/configuration')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {}, []);

  return <>{data && <RegistrationForm data={data} />}</>;
};

export default SwapPage;
