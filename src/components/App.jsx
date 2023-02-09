import React, { Component } from 'react';
import { AppDiv } from './App.styled';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesList } from 'api/ApiSearch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ErrorMassage } from './ErrorMassage/ErrorMaasage';

export class App extends Component {
  state = {
    images: [],
    modal: {
      isOpen: false,
      img: '',
    },
    searchValue: '',
    page: 1,
    apiStatus: 'idle',
    loadMore: false,
    // 'idle', 'pending', 'resolved', 'rejected'
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue) {
      this.setState({ apiStatus: 'pending' });
    }
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        const imagePak = await imagesList(searchValue, page);
        if (imagePak.length === 0) {
          this.setState({ apiStatus: 'rejected' });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...imagePak],
        }));
        imagePak.length === 12
          ? this.setState({ loadMore: true })
          : this.setState({ loadMore: false });
        this.setState({ apiStatus: 'resolved' });
      } catch (error) {
        this.setState({ apiStatus: 'rejected' });
      }
    }
  }

  openModal = img => {
    this.setState({
      modal: {
        isOpen: true,
        img,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        img: '',
      },
    });
  };

  handleSearchState = searchValue => {
    this.setState({ searchValue, images: [], page: 1, loadMore: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, apiStatus, loadMore, searchValue } = this.state;
    const { img, isOpen } = this.state.modal;

    return (
      <AppDiv>
        <Searchbar newSubmit={this.handleSearchState} />
        {apiStatus === 'pending' && (
          <MagnifyingGlass
            visible={true}
            height="200"
            width="200"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        {apiStatus === 'rejected' && <ErrorMassage name={searchValue} />}
        {apiStatus === 'resolved' && (
          <ImageGallery images={images} onOpenModal={this.openModal} />
        )}
        {loadMore && <Button loadMoreBtn={this.onLoadMore} />}
        {isOpen && <Modal img={img} onClose={this.closeModal} />}
      </AppDiv>
    );
  }
}
