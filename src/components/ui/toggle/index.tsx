interface ToggleSwitchProps {
  active: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  active,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        active
          ? "bg-green-500 hover:bg-green-400"
          : "bg-red-500 hover:bg-red-400"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          active ? "translate-x-4" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};
