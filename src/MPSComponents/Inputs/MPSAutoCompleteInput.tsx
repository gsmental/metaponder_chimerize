import React, { useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";

const MPSAutoCompleteInput = ({
  options,
  onSelect,
  labelField,
  minSearchValueLength = 3,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length >= minSearchValueLength) {
      const filtered = options.filter((option) => {
        return option[labelField]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredOptions(filtered);
    }
  };

  const handleSelectOption = (option) => {
    setInputValue(option[labelField]);
    onSelect(option);
    setFilteredOptions([]); // Clear the filtered options after selection
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form reloading
      if (filteredOptions.length === 1) {
        setInputValue(filteredOptions[0][labelField]);
        onSelect(filteredOptions[0]);
        setFilteredOptions([]);
      } else if (filteredOptions.length > 0) {
        if (selectedItem !== null) {
          setInputValue(selectedItem[labelField]);
          onSelect(selectedItem);
          setFilteredOptions([]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent scrolling the page
      if (filteredOptions.length > 0) {
        let currentIndex = -1;
        filteredOptions.forEach(function (x, index) {
          if (x[labelField] === inputValue) {
            currentIndex = index;
          }
        });

        const nextIndex = (currentIndex + 1) % filteredOptions.length;
        setInputValue(filteredOptions[nextIndex][labelField]);
        setSelectedItem(filteredOptions[nextIndex]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent scrolling the page
      if (filteredOptions.length > 0) {
        let currentIndex = 0;
        filteredOptions.forEach(function (x, index) {
          if (x[labelField] === inputValue) {
            currentIndex = index;
          }
        });

        if (currentIndex >= 0) {
          const nextIndex = (currentIndex - 1) % filteredOptions.length;
          setInputValue(filteredOptions[nextIndex][labelField]);
          setSelectedItem(filteredOptions[nextIndex]);
        }
      }
    }
  };

  return (
    <div>
      <Form>
        <FormControl
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter any value......"
          autoFocus
        />
      </Form>
      {filteredOptions.length > 0 && inputValue.length > 0 && (
        <ListGroup>
          {filteredOptions.map((option: any, index) => (
            <ListGroup.Item
              style={
                option === selectedItem ? { backgroundColor: "lightblue" } : {}
              }
              key={index}
              action
              onClick={() => handleSelectOption(option)}>
              {option[labelField]}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default MPSAutoCompleteInput;
