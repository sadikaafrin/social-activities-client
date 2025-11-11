import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contex/AuthContext';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

const Login = () => {
    const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  // const [email, setEmail] = useState(null);
  const {
    signInWithEmailAndPasswordFunc,
    signInWithFunc,
    signOutUserFunc,
    sentPassResetEmailFunc,
    user,
    setUser,
    setLoading,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state || "/";
  console.log(location);

  useEffect(() => {
    if (user) {
      navigate(form, { replace: true });
    }
  }, [user, navigate, form]); 

  // if(user){
  //   navigate("/");
  //   return;
  // }

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setLoading(false);
        console.log(res);
        setUser(res.user);
        navigate(form);
        // if (!res.user?.emailVerified) {
        //   toast.error("Your email is not verified");
        //   return;
        // }
        console.log(res);
        setUser(res.user);
        navigate(form);
        toast.success("Signing Successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          toast.error("Invalid email or password.");
          setError("Invalid email or password.");
        } else {
          toast.error(
            error.message || "An unknown error occurred during sign in."
          );
        }
      });
  };

  const handleGoogleSignin = () => {
    signInWithFunc()
      .then((result) => {
        setLoading(false);
        console.log(result.user);
        setUser(result.user);
        navigate(form);
        toast.success("Signin successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleForgetPassword = (e) => {
    const email = emailRef.current.value;
    sentPassResetEmailFunc(email)
      .then((res) => {
        setLoading(false);
        toast.success("Check your email to reset password");
        window.open("https://mail.google.com/", "_blank");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
    return (
        <div className="flex justify-center items-center min-h-screen">
      <div className="py-5   card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="font-semibold text-2xl text-center">
          Login your account
        </h1>
        <form onSubmit={handleSignin} className="card-body">
          <fieldset className="fieldset">
            <div>
              <label className="label">Email</label>
              <input
                required
                name="email"
                ref={emailRef}
                type="email"
                className="input"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label className="label">Password</label>
              <input
                required
                name="password"
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute cursor-pointer right-[24px]  top-[35px] z-50"
              >
                {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
              </span>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <button
              className="hover:underline cursor-pointer"
              onClick={handleForgetPassword}
              type="button"
            >
              Forget password?
            </button>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <h1 className="font-semibold text-center pt-5">
              Dont’t Have An Account ?{" "}
              <Link className="text-secondary" to="/auth/register">
                Register
              </Link>
            </h1>
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
    );
};

export default Login;