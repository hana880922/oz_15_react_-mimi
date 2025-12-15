export default function FormInput({ label, type, value, onChange, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={error ? "input error" : "input"}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
