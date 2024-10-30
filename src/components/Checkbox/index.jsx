import "./style.css";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" checked={checked} id={label} onChange={onChange} />
      <label className="checkbox-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
