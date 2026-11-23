
import api from "./api";
import SubmitButton from "./SubmitButton";
import { useState, useActionState } from "react";

const AuthForm = ({ onLogin }) => {
  const [mode, setMode] = useState("login");

  const submitAction = async (prevState, formData) => {
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      return {
        error: "Username and password are required",
        msg: "",
        username: username || "",
      };
    }

    try {
      if (mode === "register") {
        await api.post("/auth/register", { username, password });

        setMode("login");

        return {
          error: null,
          msg: "User registered successfully",
          username,
        };
      }

      // Login mode
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      if (!data.token) {
        throw new Error("JWT token was not received from server");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", username);

      onLogin(username);

      return {
        error: null,
        msg: "",
        username: data.username || username,
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
        msg: "",
        username,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(
    submitAction,
    {
      error: null,
      msg: "",
      username: "",
    }
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">
        {mode === "login" ? "Login" : "Register"}
      </h3>

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        autoComplete="username"
        defaultValue={state.username}
        required
        disabled={isPending}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete={
          mode === "login" ? "current-password" : "new-password"
        }
        required
        disabled={isPending}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

      <SubmitButton />

      <button
        type="button"
        disabled={isPending}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
        }}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>

      {state.msg && (
        <p
          className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
          role="status"
        >
          {state.msg}
        </p>
      )}

      {state.error && (
        <p
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {state.error}
        </p>
      )}
    </form>
  );
};

export default AuthForm;
