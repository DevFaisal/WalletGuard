import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/users/register", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: true })}
            className="w-full p-3 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.name && <p className="text-red-600">Invalid name</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-3 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.email && <p className="text-red-600">Invalid email</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-3 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.password && <p className="text-red-600">Invalid password</p>}
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
