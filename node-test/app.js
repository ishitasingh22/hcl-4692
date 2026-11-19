export const greet = (name) => {
  return `Hello, ${name}`;
};
export const greetHindi = (name) => {
  return `नमस्ते, ${name}`;
};

export const processOrder = (data, dependency) => {
  //apply logic
  //call payment gateway
  const paymentInfo = dependency.processPayment(data.amount);
  return paymentInfo;
  // if (!data) {
  //   throw new Error('Order data is required');
  // }
  // if (!dependency) {
  //   throw new Error('Dependency is required');
  // }
};
const processPayment = (amount) => {
  // Simulate payment processing logic
  return {  
    status: 'success',
    amount: amount,
    transactionId: '1234567890',
  };
}