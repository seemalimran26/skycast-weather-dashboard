function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10"
    >
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
        <Icon size={22} />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StatCard;