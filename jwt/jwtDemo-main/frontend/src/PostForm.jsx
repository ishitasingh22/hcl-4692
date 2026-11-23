import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import api from "./api";

const PostForm = ({ onCreated }) => {
  const submitAction = async (prev, formData) => {
    const title = formData.get("title")?.trim();
    const content = formData.get("content")?.trim();
    if (!title || !content) {
      return {
        error: "Title and content is required",
        msg: "",
        title: title || "",
        content: content || "",
      };
    }
    try {
      console.log("Submitting post:", { title, content });

const response = await api.post("/posts", { title, content });

console.log("POST response:", response.status, response.data);
      
      await onCreated?.();

      return {
        error: null,
        msg: "post created successfully",
        title: "",
        content: "",
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.dta?.message ||
          "failed to create post. Please try again.",
        msg: "",
        title,
        content,
      };
    }
  };
  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    title: "",
    content: "",
  });
  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">Write a Post</h3>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        defaultValue={state.title}
        required
        disabled={isPending}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
      <textarea
        name="content"
        id="content"
        placeholder="Content"
        rows={4}
        defaultValue={state.content}
        required
        disabled={isPending}
        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      ></textarea>
      <SubmitButton />
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
export default PostForm;
