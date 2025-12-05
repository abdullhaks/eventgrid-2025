
export const FormInput = ({ label, type = 'text', value, onChange, error, placeholder, name }:any) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-1 py-1 rounded-lg border border-amber-500 text-xs${
          error ? 'border-red-400 focus:ring-red-300' : 'border-orange-300 focus:ring-orange-500'
        } focus:outline-none focus:ring-1 transition-all`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};