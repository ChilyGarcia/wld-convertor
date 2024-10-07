'use client';

import Button from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState, useRef } from 'react';

export default function Page({ params }) {
  const [qrValue, setQrValue] = useState('');
  const textRef = useRef(null);

  const [data, setData] = useState({});

  useEffect(() => {
    console.log(qrValue);

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/order-details?uuid=${qrValue}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(
          'Esta es la informacion que responde el back:',
          data.response,
        );

        setData(data.response);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    if (qrValue !== '') {
      fetchData();
    }
  }, [qrValue]);

  useEffect(() => {
    if (params && params.uuid) {
      setQrValue(params.uuid);
    } else {
      console.log('No hay');
    }
  }, [params]);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // alert('Texto copiado al portapapeles');
        })
        .catch((err) => {
          console.error('Error al copiar el texto: ', err);
        });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="mx-auto mt-16 max-w-md rounded-lg border bg-white p-4 shadow">
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center">
            <h1 className="mb-6 mt-4 font-semibold">Intercambio wld</h1>
            <svg
              width="18"
              height="18"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 225.000000 225.000000"
              preserveAspectRatio="xMidYMid meet"
              className="mb-2 ml-4"
            >
              <g
                transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M975 2239 c-429 -54 -807 -380 -929 -803 -172 -591 175 -1219 768
                  -1390 308 -90 663 -36 927 140 471 312 639 923 394 1430 -209 432 -677 683
                  -1160 623z m380 -228 c110 -28 265 -108 355 -184 l75 -62 -380 -6 c-427 -6
                  -448 -9 -588 -81 -145 -76 -263 -223 -307 -383 l-17 -60 -137 -3 -136 -3 0 24
                  c0 44 39 175 73 251 124 268 354 452 647 517 111 25 298 20 415 -10z m614
                  -535 c31 -75 61 -183 61 -223 l0 -23 -661 0 -661 0 7 28 c18 72 96 172 178
                  224 98 63 132 67 614 67 l431 1 31 -74z m-1459 -521 c43 -159 162 -307 306
                  -382 144 -75 160 -77 586 -78 208 0 378 -3 378 -7 0 -13 -126 -112 -191 -151
                  -456 -270 -1052 -91 -1284 386 -43 88 -85 224 -85 274 l0 24 136 -3 137 -3 17
                  -60z m1520 43 c0 -41 -30 -149 -61 -224 l-31 -74 -423 0 c-447 0 -490 3 -582
                  47 -94 44 -198 160 -218 246 l-7 27 661 0 661 0 0 -22z"
                />
              </g>
            </svg>
          </div>
          <QRCodeCanvas
            value={data?.address}
            size={256}
            className="mx-auto p-8"
          />
          <div className="mt-4 flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full items-start justify-start">
                <label className="mb-2 text-sm font-light">
                  Wallet address
                </label>
              </div>
              <div className="flex w-full overflow-hidden rounded shadow-lg">
                <div className="overflow-x-auto px-6 pb-2 pt-4">
                  <h1 ref={textRef} className="whitespace-nowrap">
                    {data?.address ||
                      'No address available, please wait a moment'}
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleCopy}
                    className="flex w-1/4 cursor-pointer items-center justify-center rounded bg-[#4B5563] px-4 py-2 font-bold text-white hover:bg-white hover:text-[#4B5563]"
                  >
                    <label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                        />
                      </svg>
                    </label>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex w-full flex-col items-center justify-center">
              <div className="flex w-full items-start justify-start">
                <label className="mb-2 text-sm font-light">
                  Valor a enviar:
                </label>
              </div>
              <div className="flex w-full overflow-hidden rounded shadow-lg">
                <div className="overflow-x-auto px-6 pb-2 pt-4">
                  <h1 className="whitespace-nowrap">{data?.amount}</h1>
                </div>
              </div>
            </div>
          </div>
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </>
  );
}
