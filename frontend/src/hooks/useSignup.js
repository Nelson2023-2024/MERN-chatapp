import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  //context
  //   const { authUser, setAuthUser } = useAuthContext();
  const { authUser, setAuthUser } = useAuthContext();
  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    //if no errors this is not hit
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Signup failed. Please try again");
      }

      //setuserToLocalStorage
      localStorage.setItem("authenticated-user", JSON.stringify(data));

      //updateContext
      setAuthUser(data);
      //   console.log(data);
      console.log("Authuser from context:", authUser);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords dodn't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
