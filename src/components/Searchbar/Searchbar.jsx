import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  Serchbar,
  SearchForm,
  SearchFormBtn,
  SubmitLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleNameChange = evt => {
    this.setState({ searchValue: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.newSubmit(this.state.searchValue);

    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <Serchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <ImSearch size="20" color="blue" />
            <SubmitLabel>Search</SubmitLabel>
          </SearchFormBtn>

          <SearchFormInput
            name="searchValue"
            type="text"
            autocomplete="off"
            value={searchValue}
            onChange={this.handleNameChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Serchbar>
    );
  }
}
