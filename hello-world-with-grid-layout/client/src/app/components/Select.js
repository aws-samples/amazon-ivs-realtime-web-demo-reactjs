// Select component takes in deviceType, devices, and updateDevice as props
const Select = ({ deviceType, devices, updateDevice }) => {
  return (
    // Div container with column class for styling
    <div className="column">
      <label>{`Select ${deviceType}:`}</label>
      <select onChange={(e) => updateDevice(e.target.value)}>
        device
        {devices?.map((device) => {
          return (
            // Option for each device, with a unique key and value representing the device ID
            <option
              key={`${deviceType.charAt(0).toLowerCase() +
                deviceType.slice(1)}-${device.deviceId}`}
              value={device.deviceId}
            >
              {device.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

// Export the Select component as default
export default Select;
