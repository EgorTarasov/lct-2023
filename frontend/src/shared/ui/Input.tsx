import React, { useState } from "react";

interface Props {
  name: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  onChange: (value: string) => void;
}

const TextInput: React.FC<Props> = ({ name, error, disabled, clearable, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  const inputStyle = `form-input block w-full px-3 py-1.5 text-base font-normal ${
    disabled ? "text-gray-500" : "text-gray-700"
  } bg-white bg-clip-padding border ${
    error ? "border-red-500" : "border-gray-300"
  } rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white ${
    disabled ? "" : "focus:border-blue-600 focus:outline-none"
  } relative bg-gray-50`;

  const labelStyle = `mb-2 text-sm font-medium ${
    error ? "text-red-600" : disabled ? "text-gray-500" : "text-gray-900"
  }`;

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className={labelStyle}>
        {name}
      </label>
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={inputStyle}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {clearable && value && !disabled && (
          <button
            onClick={handleClear}
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Очистить поле">
            ✖
          </button>
        )}
        {error && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
            <span role="img" aria-label="Ошибка">
              ⚠️
            </span>
          </span>
        )}
      </div>
      {error && (
        <span id={`${name}-error`} className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
