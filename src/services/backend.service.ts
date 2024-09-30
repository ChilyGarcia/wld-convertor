export const backendService = {
  configuration: async () => {
    try {
      const response = fetch('https://wld.lol/api/v1/configurations').then(
        (res) => {
          return res.json();
        },
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  convert: async (data: any) => {
    try {
      const response = fetch(
        'https://wld.lol/api/v1/convert?amount' +
          data.amount +
          '&inverted=1&referrals_reference=&payment_method=0',
      ).then((res) => {
        return res.json();
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
