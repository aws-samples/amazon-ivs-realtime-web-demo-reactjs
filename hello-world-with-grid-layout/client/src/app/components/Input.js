// Input component takes in label, value, and onChange as props
const Input = ({ label, value, onChange }) => {
  return (
    // Div container with column class for styling
    <div className="column margin-right">
      <label>{`${label}:`}</label>
      <input
        value={value} // Value of the input field
        onChange={(e) => onChange(e.target.value)} // Handles the change in input value
        type="text" // Specifies the type of input field
      ></input>
    </div>
  );
};

// Export the Input component as default
export default Input;
