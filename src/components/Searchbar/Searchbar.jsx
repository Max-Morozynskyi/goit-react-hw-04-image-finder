import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  Serchbar,
  SearchForm,
  SearchFormBtn,
  SubmitLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ newSubmit }) => {
  const [searchValue, setSearchValue] = useState;

  const handleNameChange = evt => {
    setSearchValue(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    newSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <Serchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <ImSearch size="20" color="blue" />
          <SubmitLabel>Search</SubmitLabel>
        </SearchFormBtn>

        <SearchFormInput
          name="searchValue"
          type="text"
          autocomplete="off"
          value={searchValue}
          onChange={handleNameChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Serchbar>
  );
};
