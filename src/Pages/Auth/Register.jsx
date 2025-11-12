import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contex/AuthContext";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    setLoading,
    // signOutUserFunc,
    signInWithFunc,
    setUser,
    user,
  } = useContext(AuthContext);

  const location = useLocation();
  const form = location.state || "/";
  console.log(location);

  useEffect(() => {
    if (user) {
      navigate(form, { replace: true });
    }
  }, [user, navigate, form]);

  //  if(user){
  //     navigate('/');
  //     return;
  //   }

  const handleSignup = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName?.value;
    const photoURL = e.target.photoURL?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    console.log({ email, password });
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$/;

    console.log(regExp.test(password));

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    // create user with email and password
    // createUserWithEmailAndPasswordFunc(email, password)
    //   .then((res) => {
    //     const createdUser = res.user;
    //     // Update profile
    //     updateProfileFunc(displayName, photoURL)
    //       .then(() => {
    //         const updatedUser = {
    //           ...createdUser,
    //           displayName: displayName,
    //           photoURL: photoURL,
    //         };
    //         setUser(updatedUser);
    //         // const createdUser = res.user;
    //         console.log(res);
    //         setLoading(false);
    //         toast.success("Signup Successfully");
    //         navigate(form);
    //       })
    //       .catch((error) => {
    //         toast.error(error.message);
    //       });
    //   })
    //   .catch((e) => {
    //     console.log(e.code);
    //     if (e.code == "auth/email-already-in-use") {
    //       toast.error("User already exist in the database");
    //     } else {
    //       if (e.code == "auth/weak-password") {
    //         toast.error("Password should be at least 6 digit");
    //       } else {
    //         toast.error(e.code);
    //       }
    //     }
    //   });
    createUserWithEmailAndPasswordFunc(email, password)
      .then(async (res) => {
        const createdUser = res.user;
        // Update Firebase profile
        await updateProfileFunc(displayName, photoURL);
        const updatedUser = {
          ...createdUser,
          displayName,
          photoURL,
        };
        setUser(updatedUser);
        setLoading(false);
        const token = await createdUser.getIdToken();
        // Send user info to your Express backend to store in MongoDB
        await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            displayName,
            photoURL,
            email,
          }),
        });

        toast.success("Signup Successfully");
        navigate(form);
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        } else if (e.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters");
        } else {
          toast.error(e.code);
        }
      });
  };

  // Google Sign
  const handleGoogleSignin = async () => {
  try {
    const result = await signInWithFunc();
    const loggedUser = result.user;
    setUser(loggedUser);
    setLoading(false);

    // ✅ Get Firebase ID token
    const token = await loggedUser.getIdToken();

    // ✅ Send user info to your backend (same /register route)
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        email: loggedUser.email,
      }),
    });

    toast.success("Google Signin Successfully");
    navigate(form);
  } catch (e) {
    console.error(e);
    toast.error(e.message);
  }
};
  // const handleGoogleSignin = () => {
  //   signInWithFunc()
  //     .then((result) => {
  //       setLoading(false);
  //       console.log(result.user);
  //       setUser(result.user);
  //       navigate(form);
  //       toast.success("Signin successfully");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       toast.error(e.message);
  //     });
  // };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="py-5   card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="font-semibold text-2xl text-center">
          Register your account
        </h1>
        <form onSubmit={handleSignup} className="card-body">
          <fieldset className="fieldset">
            <div>
              <label className="label">Name</label>
              <input
                required
                type="text"
                name="displayName"
                className="input"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="label">Photo Url</label>
              <input
                required
                type="text"
                name="photoURL"
                className="input"
                placeholder="Photo"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                required
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label className="label">Password</label>
              <input
                required
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="......."
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute cursor-pointer right-[23px] top-[33px] z-50"
              >
                {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
              </span>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-white/30"></div>
              <span className="text-sm text-white/70">or</span>
              <div className="h-px w-16 bg-white/30"></div>
            </div>

            {/* Google Signin */}
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
            <h1 className="font-semibold text-center pt-5">
              Already Have An Account ?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </h1>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
