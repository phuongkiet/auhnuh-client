import { Field, Form, Formik } from "formik";
import { useStore } from "../../app/stores/store.ts";
import * as Yup from "yup";
import { UserLoginFormValues } from "../../app/models/user.model.ts";
import { Link, useNavigate } from "react-router-dom";

// import {useState} from "react";

function Login() {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const userForm = { email: "", password: "" } as UserLoginFormValues;

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={userForm}
      onSubmit={(values: UserLoginFormValues) => userStore.login(values)}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, isValid, dirty, touched }) => (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
          <div className="flex md:flex-row items-center max-w-5xl w-full bg-gray-900 rounded-lg overflow-hidden">
            {/* Left Side - Form */}
            <div className="w-full px-52">
              <div className="text-center">
                <h1 className="mb-2 text-4xl font-extrabold text-green-800 leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-red-600">
                  Welcome Back!
                </h1>

                <h1 className="my-5 text-sm font-semibold leading-none tracking-tight text-white ">
                  Easy to watch new anime with
                  <span className="text-green-600 dark:text-red-600 ml-3">
                    AuhNuh Streaming
                  </span>
                </h1>
              </div>

              <Form className="space-y-6">
                <div>
                  <label className="block text-sm text-red-600 font-bold mb-2 ">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="text"
                    required
                    placeholder="Email"
                    className={`w-full px-2 py-3 border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-red-600 mb-2 font-bold">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={"password"}
                      required
                      placeholder="Password"
                      className={`w-full px-2 py-3 border ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
                    />
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={togglePasswordVisibility}*/}
                    {/*    className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-600"*/}
                    {/*>*/}
                    {/*    {showPassword ? "🙈" : "️🙉"}*/}
                    {/*</button>*/}
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgotpassword"
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  className={`w-full py-3 text-white rounded-lg ${
                    isValid && dirty
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </button>
              </Form>
              <p className="text-center text-sm text-white mt-6">
                <span className="text-white font-semibold" >Don't have an account? </span>
                <span
                  className="text-red-600 font-semibold hover:underline ml-1 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register now
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
