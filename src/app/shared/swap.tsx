'use client';

import { useState, useEffect } from 'react';
import RegistrationForm from '@/components/step-by-step/step-by-step';
import { useLayout } from '@/lib/hooks/use-layout';

const sort = [
  { id: 1, name: 'DaviPlata' },
  { id: 2, name: 'Bancolombia' },
  { id: 3, name: 'Nequi' },
];

const SwapPage = () => {

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
