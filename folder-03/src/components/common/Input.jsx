import "./Input.css";

function Input({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div className="input-group">
      <label className="input-label">
        {label}
      </label>

      <input
        className="input-field"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Input;