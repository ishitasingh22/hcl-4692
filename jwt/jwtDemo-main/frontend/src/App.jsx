import { useEffect, useState } from "react";
import api from "./api";
import AuthForm from "./AuthForm";
import PostForm from "./PostForm";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [posts, setPosts] = useState([]);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const loadPosts = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  const deletePost = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingPostId(post.id);
    setDeleteError("");
    try {
      await api.delete(`/posts/${post.id}`);
      setPosts((currentPosts) =>
        currentPosts.filter((currentPost) => currentPost.id !== post.id),
      );
    } catch (error) {
      setDeleteError(
        error.response?.data?.message || "Could not delete the post. Please try again.",
      );
    } finally {
      setDeletingPostId(null);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            JWT Blog Demo
          </h1>

          {user && (
            <button
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <section className="space-y-4">
          {user ? (
            <>
              <p className="text-sm text-slate-600">
                Logged in as{" "}
                <span className="font-semibold text-slate-900">{user}</span>
              </p>

              <PostForm onCreated={loadPosts} />
            </>
          ) : (
            <AuthForm onLogin={setUser} />
          )}
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              All Posts
            </h2>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          {posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <p className="text-slate-600">
                No posts yet. Be the first to publish one!
              </p>
            </div>
          )}

          {deleteError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {deleteError}
            </p>
          )}

          <div className="grid gap-4">
            {posts.map((p) => (
              <article
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                key={p.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {p.title}
                  </h3>
                  {user === p.author && (
                    <button
                      className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={() => deletePost(p)}
                      disabled={deletingPostId === p.id}
                      aria-label={`Delete ${p.title}`}
                    >
                      {deletingPostId === p.id ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>

                <p className="whitespace-pre-wrap leading-7 text-slate-700">
                  {p.content}
                </p>

                <div className="flex flex-col gap-1 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    By{" "}
                    <span className="font-medium text-slate-700">
                      {p.author}
                    </span>
                  </span>

                  <time dateTime={p.createdAt}>
                    {new Date(p.createdAt).toLocaleString()}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default App;
