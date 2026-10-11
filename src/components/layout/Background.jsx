// Fixed gradient background with soft glow blobs, shared by all pages
function Background({
  gradient = "from-slate-950 via-blue-950 to-indigo-950",
}) {
  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br ${gradient}`}
      />
      <div className="pointer-events-none fixed -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
    </>
  );
}

export default Background;
