import { useEffect, useState } from 'react';
import { AppDiv } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesList } from 'api/ApiSearch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ErrorMassage } from './ErrorMassage/ErrorMaasage';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [apiStatus, setApiStatus] = useState('idle');
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setApiStatus('pending');
    imagesList(searchValue, page, pageSize)
      .then(apiData => {
        if (apiData.length === 0) {
          setApiStatus('404 error');
          return;
        }
        setImages(prevImgs => [...prevImgs, ...apiData]);
        apiData.length === pageSize ? setLoadMore(true) : setLoadMore(false);
        setApiStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setApiStatus('rejected');
      });
  }, [searchValue, page]);

  const handleSearchState = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppDiv>
      <Searchbar newSubmit={handleSearchState} />
      <ImageGallery images={images} />
      {apiStatus === 'resolved' && (
        <h3>
          You searched "{searchValue}". (Page {page})
        </h3>
      )}
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
      {apiStatus === '404 error' && <ErrorMassage name={searchValue} />}
      {apiStatus === 'rejected' && (
        <div>
          <h2>
            OOPS! You didn`t well!<p> {error}</p>
          </h2>
        </div>
      )}
      {loadMore && <Button loadMoreBtn={onLoadMore} />}
    </AppDiv>
  );
};
