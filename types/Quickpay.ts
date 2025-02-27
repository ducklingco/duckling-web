type QuickpayEndpointBase = {
  options: RequestInit;
};

export type QuickpayEndpointWithoutId = QuickpayEndpointBase & {
  url: () => string;
};

export type QuickpayEndpointWithId = QuickpayEndpointBase & {
  url: (id: string) => string;
};

export type QuickpayEndpoints = {
  generalOptions: {
    headers: Record<string, string>;
  };
  createPayment: QuickpayEndpointWithoutId;
  updatePayment: QuickpayEndpointWithId;
  checkPayment?: QuickpayEndpointWithId;
  capturePayment?: QuickpayEndpointWithId;
};

export const createFormData = (
  data?: Record<string, string | boolean | number>,
): FormData => {
  const formData = new FormData();

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
  }

  return formData;
};
