import { useAuth } from "../context";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-10">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user ? user.name : "User"}
      </h1>
      <TransactionForm />
    </div>
  );
};

export default Dashboard;
