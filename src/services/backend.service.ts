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
};
