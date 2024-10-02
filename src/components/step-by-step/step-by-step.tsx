import React, { useEffect, useState, useCallback } from 'react';
import { Fragment } from 'react';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import Trade from '@/components/ui/trade';
import cn from '@/utils/cn';
import { Listbox } from '@/components/ui/listbox';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import HorizontalThreeDots from '@/components/icons/horizontal-three-dots';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useLayout } from '@/lib/hooks/use-layout';
import { Transition } from '@/components/ui/transition';
import Checkbox from '@/components/ui/forms/checkbox';
import { Configuration } from '@/interfaces/configuration.interface';

interface RegistrationFormProps {
  data: Configuration;
}

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300"></div>

      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
            index < currentStep ? 'bg-[#323743] text-white' : 'bg-gray-300'
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [body, setBody] = useState({
    full_name: '',
    referal_code: '',
    document_number: '',
    email: '',
    phone_number: '',
    payment_method: data.payment_methods[0][0],
    account_type: '',
    account_number: '',
    send: '',
    receive: '',
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    let [toggleCoin, setToggleCoin] = useState(false);
    const [selectedItem, setSelectedItem] = useState(data.payment_methods[0]);
    const [selectedTypeAccount, setSelectedTypeAccount] = useState(
      data.bank_types[0],
    );
    const { layout } = useLayout();

    const handleSelectChange = (selectedValue) => {
      setSelectedItem(selectedValue);
      setBody((prevBody) => ({
        ...prevBody,
        payment_method: selectedValue[0],
      }));
    };

    const handleTypeAccountChange = (selectedValue) => {
      setSelectedTypeAccount(selectedValue);
      setBody((prevBody) => ({
        ...prevBody,
        account_type: selectedValue[0],
      }));
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setBody((prevBody) => ({
        ...prevBody,
        [id]: value,
      }));
    };

    const handleTabDown = async (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      const fetchValidateData = async () => {
        const bodyValidate = {
          document_number: body.document_number,
        };

        try {
          const response = await fetch('api/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyValidate),
          });

          if (!response.ok) {
            throw new Error(`Error en la API externa: ${response.statusText}`);
          }

          const data = await response.json();

          return data;
        } catch (error) {
          console.error('Error:', error);
        }
      };
      if (event.key === 'Tab') {
        console.log('Se presionó la tecla TAB');

        const responseValidate = await fetchValidateData();

        console.log(responseValidate.data.phone_number);

        setBody((prevBody) => ({
          ...prevBody,
          phone_number: responseValidate.data.phone_number,
          full_name: responseValidate.data.full_name,
          email: responseValidate.data.email,
        }));
      }
    };

    useEffect(() => {
      console.log(body);
    }, [body]);

    switch (currentStep) {
      case 1:
        return (
          <div>
            <Trade>
              <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
                <div className="flex w-full flex-row items-center justify-center">
                  <div className="flex items-center">
                    <h1 className="mb-6 mt-4 font-semibold">Intercambio wld</h1>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 225.000000 225.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="mb-2 ml-4" // Añade un margen izquierdo para separar el texto del SVG
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
                <div
                  className={cn(
                    'relative flex gap-3',
                    toggleCoin ? 'flex-col-reverse' : 'flex-col',
                  )}
                >
                  <CoinInput
                    label={'Envias'}
                    exchangeRate={0.0}
                    defaultCoinIndex={0}
                    type="send"
                    getCoinValue={(data) =>
                      console.log('From coin value:', data)
                    }
                  />
                  <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
                    {/* <Button
                      size="mini"
                      color="gray"
                      shape="circle"
                      variant="transparent"
                      onClick={() => setToggleCoin(!toggleCoin)}
                    >
                      <SwapIcon className="h-auto w-3" />
                    </Button> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 xs:gap-[18px]">
                <TransactionInfo label={'Método de consignacion'} />
              </div>

              <div className="relative w-full lg:w-auto">
                <Listbox value={selectedItem} onChange={handleSelectChange}>
                  {layout === LAYOUT_OPTIONS.RETRO ? (
                    <>
                      <Listbox.Button className="hidden h-11 w-full items-center justify-between rounded-lg pr-2 text-sm text-gray-900 dark:text-white lg:flex xl:flex 3xl:hidden">
                        <HorizontalThreeDots />
                      </Listbox.Button>
                      <Listbox.Button
                        className={cn(
                          'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white lg:hidden lg:w-40 xl:hidden xl:w-48 3xl:flex',
                        )}
                      >
                        {selectedItem[1]} <ChevronDown />
                      </Listbox.Button>
                    </>
                  ) : (
                    <Listbox.Button
                      className={cn(
                        'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white',
                      )}
                    >
                      {selectedItem[1]}
                      <ChevronDown />
                    </Listbox.Button>
                  )}
                  <Transition
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 -translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                  >
                    <Listbox.Options className="absolute z-20 mt-2 w-full min-w-[150px] origin-top-right rounded-lg bg-white p-3 px-1.5 shadow-large shadow-gray-400/10 dark:bg-[rgba(0,0,0,0.5)] dark:shadow-gray-900 dark:backdrop-blur ltr:right-0 rtl:left-0">
                      {data.payment_methods.map((item) => (
                        <Listbox.Option key={item[0]} value={item}>
                          {({ selected }) => (
                            <div
                              className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
                                selected
                                  ? 'my-1 bg-gray-100 dark:bg-gray-700'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                            >
                              {item[1]}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>

              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                onClick={nextStep}
                className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
              >
                Continuar
              </Button>
            </Trade>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="flex w-full flex-row items-center justify-center">
              <div className="flex items-center">
                <h1 className="mb-6 mt-4 font-semibold">Intercambio wld</h1>
              </div>
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

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="referal_code"
                className="mb-0.5 text-sm font-normal"
              >
                Código de referido
              </label>
              <input
                id="referal_code"
                type="text"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="document_number"
                className="mb-0.5 text-sm font-normal"
              >
                Número de documento
              </label>
              <input
                id="document_number"
                type="text"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={handleTabDown}
                onChange={handleChange}
                value={body.document_number}
              />

              <label htmlFor="full_name" className="mb-0.5 text-sm font-normal">
                Nombre
              </label>
              <input
                id="full_name"
                type="text"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={body.full_name}
              />
              <label htmlFor="email" className="mb-0.5 text-sm font-normal">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={body.email}
              />
              <label
                htmlFor="phone_number"
                className="mb-0.5 text-sm font-normal"
              >
                {data.phone_number_placeholder}
              </label>
              <input
                id="phone_number"
                type="text"
                className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={body.phone_number}
              />
              {body.payment_method != 'cash' && (
                <>
                  <label
                    htmlFor="account_type"
                    className="mb-0.5 text-sm font-normal"
                  >
                    {data.bank_type_label}
                  </label>
                  <div className="relative w-full lg:w-auto">
                    <Listbox
                      value={selectedTypeAccount}
                      onChange={handleTypeAccountChange}
                    >
                      {layout === LAYOUT_OPTIONS.RETRO ? (
                        <>
                          <Listbox.Button className="hidden h-11 w-full items-center justify-between rounded-lg pr-2 text-sm text-gray-900 dark:text-white lg:flex xl:flex 3xl:hidden">
                            <HorizontalThreeDots />
                          </Listbox.Button>
                          <Listbox.Button
                            className={cn(
                              'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white lg:hidden lg:w-40 xl:hidden xl:w-48 3xl:flex',
                            )}
                          >
                            {selectedTypeAccount[1]} <ChevronDown />
                          </Listbox.Button>
                        </>
                      ) : (
                        <Listbox.Button
                          className={cn(
                            'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white',
                          )}
                        >
                          {selectedTypeAccount[1]}
                          <ChevronDown />
                        </Listbox.Button>
                      )}
                      <Transition
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 -translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                      >
                        <Listbox.Options className="absolute z-20 mt-2 w-full min-w-[150px] origin-top-right rounded-lg bg-white p-3 px-1.5 shadow-large shadow-gray-400/10 dark:bg-[rgba(0,0,0,0.5)] dark:shadow-gray-900 dark:backdrop-blur ltr:right-0 rtl:left-0">
                          {data.bank_types.map((item) => (
                            <Listbox.Option key={item[0]} value={item}>
                              {({ selected }) => (
                                <div
                                  className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
                                    selected
                                      ? 'my-1 bg-gray-100 dark:bg-gray-700'
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  {item[1]}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                </>
              )}

              {body.payment_method != 'cash' && (
                <>
                  <label
                    htmlFor="account_number"
                    className="mb-0.5 text-sm font-normal"
                  >
                    {data.bank_account_label}
                  </label>
                  <input
                    id="account_number"
                    type="text"
                    className="rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Checkbox
                iconClassName="bg-[#4B5563] rounded focus:!ring-0"
                label="Soy mayor de edad"
                labelPlacement="end"
                labelClassName="ml-1.5 mt-1 text-[#4B5563] sm:text-md dark:text-gray-300 tracking-[0.5px]"
                inputClassName="mt-0.5 focus:!ring-offset-[1px]"
                size="sm"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Checkbox
                iconClassName="bg-[#4B5563] rounded focus:!ring-0"
                label="He leido y acepto los terminos y condiciones"
                labelPlacement="end"
                labelClassName="ml-1.5 mt-1 text-[#4B5563] sm:text-md dark:text-gray-300 tracking-[0.5px]"
                inputClassName="mt-0.5 focus:!ring-offset-[1px]"
                size="sm"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Checkbox
                iconClassName="bg-[#4B5563] rounded focus:!ring-0"
                label="He leido y autorizo el tratamiento de mis datos de acuerdo con la politica de privacidad"
                labelPlacement="end"
                labelClassName="ml-1.5 mt-1 text-[#4B5563] sm:text-md dark:text-gray-300 tracking-[0.5px]"
                inputClassName="mt-0.5 focus:!ring-offset-[1px]"
                size="sm"
              />
            </div>

            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              onClick={nextStep}
              className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
            >
              Enviar
            </Button>
          </div>
        );
      case 3:
        return <div>Step 3 content</div>;
      case 4:
        return <div>Step 4 content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg border bg-white p-4 shadow ">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      {renderStepContent()}
      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <>
            <div className="flex w-full items-center justify-center">
              <button onClick={prevStep} disabled={currentStep === 1}>
                Atrás
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
