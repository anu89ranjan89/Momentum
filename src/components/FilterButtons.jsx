const FilterButtons = ({ filter, setFilter }) => {
  const buttons = ["all", "completed", "pending"];

  return (
    <div className="flex gap-3 mb-6">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => setFilter(btn)}
          className={`px-4 py-2 rounded-xl capitalize transition ${
            filter === btn
              ? "bg-purple-600"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;