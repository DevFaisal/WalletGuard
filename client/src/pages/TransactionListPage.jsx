import React from "react";
import TransactionList from "../components/TransactionList";
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context";

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    try {
      const { data } = await API.get("/api/transactions");
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return <TransactionList transactions={transactions} />;
};

export default TransactionListPage;
