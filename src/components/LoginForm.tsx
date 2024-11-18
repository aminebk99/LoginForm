function LoginForm() {
  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">Welcome Back</h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Welcome back! please enter your details.
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            className="w-full focus:border-gray-400 outline-none border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="password">
            Password :
          </label>
          <input
            className="w-full border-2 outline-none focus:border-gray-400 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-8 flex justify-end items-center">
          {/* <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ml-2 font-medium text-base">Remember For 30 days</label>
          </div> */}
          <button className="font-medium text-base text-blue-800">Forget password</button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className=" active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;