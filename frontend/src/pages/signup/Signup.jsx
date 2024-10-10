import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signUp } = useSignup();

  function handleGenderCheckBoxChange(gender) {
    setInputs({ ...inputs, gender });
  }
  async function handleSubmit(e) {
    console.log(inputs);
    e.preventDefault();

    const success = await signUp(inputs);

    if (success) {
      toast.success(`Signed up successfully`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-96">
      <div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="p-2 label">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={inputs.fullName}
              className="w-full h-10 input input-bordered"
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="p-2 label ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={inputs.username}
              type="text"
              placeholder="johndoe"
              className="w-full h-10 input input-bordered"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={inputs.password}
              type="password"
              placeholder="Enter Password"
              className="w-full h-10 input input-bordered"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={inputs.confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="w-full h-10 input input-bordered"
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleGenderCheckBoxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/login"}
            className="inline-block mt-2 text-sm hover:underline hover:text-blue-600"
          >
            Already have an account?
          </Link>

          <div>
            <button className="mt-2 border btn btn-block btn-sm border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
