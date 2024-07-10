import Transaction from "../model/transactionModel.js";

// Create transaction
export const createTransaction = async (req, res) => {
  const { type, amount, category, date, description } = req.body;
  const transaction = new Transaction({
    userId: req.user.id,
    type,
    amount,
    category,
    date,
    description,
  });

  await transaction.save();
  res.status(201).json(transaction);
};

// Get all transactions
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  res.json(transactions);
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction && transaction.userId.toString() === req.user.id) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction && transaction.userId.toString() === req.user.id) {
    transaction.type = req.body.type || transaction.type;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.category = req.body.category || transaction.category;
    transaction.date = req.body.date || transaction.date;
    transaction.description = req.body.description || transaction.description;

    await transaction.save();
    res.json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction && transaction.userId.toString() === req.user.id) {
    await transaction.remove();
    res.json({ message: "Transaction removed" });
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
};
