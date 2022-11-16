let currRecipient = "123";

const updateCurrRecipient = (recipient) => {
  currRecipient = recipient;
};

const worker = {
  currRecipient,
  updateCurrRecipient,
};

export default worker;
