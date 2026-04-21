export default function LoginPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6">
        <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            VEYRO
          </p>
  
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Welcome Back
          </h1>
  
          <p className="mt-2 text-sm text-slate-600">
            Login to access your Intelligence Command Center
          </p>
  
          <form className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
            />
  
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
            />
  
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }