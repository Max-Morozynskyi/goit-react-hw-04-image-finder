import { useEffect, useState } from 'react';
import { AppDiv } from './App.styled';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesList } from 'api/ApiSearch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ErrorMassage } from './ErrorMassage/ErrorMaasage';

export const App = () => {
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, img: '' });
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [apiStatus, setApiStatus] = useState('idle');
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    setApiStatus('pending');
    imagesList(searchValue, page, pageSize)
      .then(apiData => {
        if (apiData.length === 0) {
          setApiStatus('404 error');
          return;
        }
        setImages(prevImgs => [...prevImgs, ...apiData]);
        apiData.length === pageSize ? setLoadMore(true) : setLoadMore(false);
      })
      .catch(error => {
        setError(error.message);
        setApiStatus('rejected');
      })
      .finally(() => setApiStatus('resolved'));
  }, [searchValue, page]);

  const handleSearchState = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setLoadMore(prevState => prevState.page + 1);
  };

  return (
    <AppDiv>
      <Searchbar newSubmit={handleSearchState} />
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
      {apiStatus === 'resolved' && (
        <ImageGallery
          images={images}
          onOpenModal={img => {
            setModal({ isOpen: true, img });
          }}
        />
      )}
      {loadMore && <Button loadMoreBtn={onLoadMore} />}
      {modal.isOpen && (
        <Modal
          img={modal.img}
          onClose={() => {
            setModal({ isOpen: false, img: '' });
          }}
        />
      )}
    </AppDiv>
  );
};

// export class App1 extends Component {
//   state = {
//     images: [],
//     modal: {
//       isOpen: false,
//       img: '',
//     },
//     searchValue: '',
//     page: 1,
//     apiStatus: 'idle',
//     loadMore: false,
//     // 'idle', 'pending', 'resolved', 'rejected'
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchValue, page } = this.state;
//     if (prevState.searchValue !== searchValue) {
//       this.setState({ apiStatus: 'pending' });
//     }
//     if (prevState.searchValue !== searchValue || prevState.page !== page) {
//       try {
//         const imagePak = await imagesList(searchValue, page);
//         if (imagePak.length === 0) {
//           this.setState({ apiStatus: 'rejected' });
//           return;
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...imagePak],
//         }));
//         imagePak.length === 12
//           ? this.setState({ loadMore: true })
//           : this.setState({ loadMore: false });
//         this.setState({ apiStatus: 'resolved' });
//       } catch (error) {
//         this.setState({ apiStatus: 'rejected' });
//       }
//     }
//   }

//   openModal = img => {
//     this.setState({
//       modal: {
//         isOpen: true,
//         img,
//       },
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modal: {
//         isOpen: false,
//         img: '',
//       },
//     });
//   };

//   handleSearchState = searchValue => {
//     this.setState({ searchValue, images: [], page: 1, loadMore: false });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, apiStatus, loadMore, searchValue } = this.state;
//     const { img, isOpen } = this.state.modal;

//     return (
//       <AppDiv>
//         <Searchbar newSubmit={this.handleSearchState} />
//         {apiStatus === 'pending' && (
//           <MagnifyingGlass
//             visible={true}
//             height="200"
//             width="200"
//             ariaLabel="MagnifyingGlass-loading"
//             wrapperStyle={{}}
//             wrapperClass="MagnifyingGlass-wrapper"
//             glassColor="#c0efff"
//             color="#e15b64"
//           />
//         )}
//         {apiStatus === 'rejected' && <ErrorMassage name={searchValue} />}
//         {apiStatus === 'resolved' && (
//           <ImageGallery images={images} onOpenModal={this.openModal} />
//         )}
//         {loadMore && <Button loadMoreBtn={this.onLoadMore} />}
//         {isOpen && <Modal img={img} onClose={this.closeModal} />}
//       </AppDiv>
//     );
//   }
// }
