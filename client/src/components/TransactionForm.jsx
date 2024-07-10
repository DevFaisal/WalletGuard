import { useForm } from "react-hook-form";
import API from "../api";
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      amount: "",
      type: "",
      category: "",
      description: "",
    },
  });

  const categories = [
    { id: 1, name: "Salary" },
    { id: 2, name: "Business" },
    { id: 3, name: "Investment" },
    { id: 4, name: "Savings" },
    { id: 5, name: "Insurance" },
    { id: 6, name: "Gift" },
    { id: 7, name: "Rental" },
    { id: 8, name: "Loan" },
  ];

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/api/transactions", data);
      if (res.status === 201) {
        navigate("/transactions");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("amount", { required: true })}
          placeholder="Amount"
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        />
        {errors?.amount && (
          <div className="text-red-600">{errors.amount.message}</div>
        )}
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
          {...register("type", { required: true })}
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors?.type && (
          <div className="text-red-600">{errors.type.message}</div>
        )}
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
          {...register("category", { required: true })}
          className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 transition duration-500 ease-in-out"
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.category && (
          <div className="text-red-600">{errors.category.message}</div>
        )}
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
          {...register("description")}
          placeholder="Description"
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
