import React, { useState } from "react";

const TransactionList = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const filterTransactions = () => {
    const filtered = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      return date.getMonth() + 1 === selectedMonth;
    });
    return filtered;
  };

  const getTransactionTotals = () => {
    const totals = {};
    filterTransactions().forEach((transaction) => {
      const amount = parseInt(transaction.amount);
      if (!totals[transaction.type]) {
        totals[transaction.type] = 0;
      }
      totals[transaction.type] += amount;
    });
    return totals;
  };

  return (
    <div className="container mx-auto max-w-md p-4 bg-gray-100 rounded overflow-x-auto">
      <div class="flex flex-col justify-center h-screen p-4">
        <h2 class="text-3xl font-bold mb-4 text-gray-800">Transactions</h2>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          class="w-full py-2 px-3 border border-gray-300 rounded-lg bg-white"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <button
          onClick={() => console.log("Filter by Month")}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Filter by Month
        </button>

        <table class="w-full mt-8 mb-4">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2 text-left text-gray-600 text-sm font-bold">
                Date
              </th>
              <th class="px-4 py-2 text-left text-gray-600 text-sm font-bold">
                Type
              </th>
              <th class="px-4 py-2 text-right text-gray-600 text-sm font-bold">
                Amount
              </th>
              <th class="px-4 py-2 text-left text-gray-600 text-sm font-bold">
                Category
              </th>
              <th class="px-4 py-2 text-left text-gray-600 text-sm font-bold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions().map((transaction) => (
              <tr
                key={transaction._id}
                class={
                  transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                }
              >
                <td class="px-4 py-2 text-left">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td class="px-4 py-2 text-left">
                  {transaction.type === "income" ? "+" : "-"}
                </td>
                <td class="px-4 py-2 text-right">{transaction.amount}</td>
                <td class="px-4 py-2 text-left">{transaction.category}</td>
                <td class="px-4 py-2 text-left text-sm text-gray-600">
                  {transaction.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {Object.keys(getTransactionTotals()).map((type) => (
          <p key={type} className="font-bold">
            {type === "income" ? "Income" : "Expense"}:{" "}
            {getTransactionTotals()[type]}
            {getTransactionTotals()[type] > 0 ? (
              <>
                {" "}
                (
                <span className="text-green-500">
                  {getTransactionTotals()[type]}
                </span>
                )
              </>
            ) : (
              <>
                {" "}
                (
                <span className="text-red-500">
                  {Math.abs(getTransactionTotals()[type])}
                </span>
                )
              </>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
