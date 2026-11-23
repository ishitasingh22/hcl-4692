import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex w-full items-center justify-center gap-2 rounded-lg
        px-6 py-3 font-semibold text-white shadow-sm transition
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${
          pending
            ? "cursor-not-allowed bg-indigo-400 opacity-80"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
        }`}
    >
      {pending && (
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      {pending ? "Submitting Securely..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
