import { useState } from "react";
import { useAuth } from "../context";
import axios from "axios";
import API from "../api";

const categories = [
  { name: "Home", id: 1 },
  { name: "Business", id: 2 },
  { name: "Gym", id: 3 },
  { name: "Food", id: 4 },
  { name: "Transportation", id: 5 },
  { name: "Entertainment", id: 6 },
  { name: "Shopping", id: 7 },
  { name: "Miscellaneous", id: 8 },
];

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = {
      amount,
      type,
      category,
      description,
      userId: user._id,
    };

    try {
      await API.post("/api/transactions", transaction);
      setAmount("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 pt-10 pb-8 rounded-lg bg-white shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Transaction</h2>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-600"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-600"
        >
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
