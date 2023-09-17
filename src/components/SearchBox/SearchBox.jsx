import { Input, Button } from './SearchBox.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const SearchBox = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
