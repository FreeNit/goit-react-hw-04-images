import { useState } from 'react';
import { Dna } from 'react-loader-spinner';

import { GlobalStyle } from 'components/GlobalStyle';
import { AppStyled } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fetchImagesData } from 'components/Services/fetchImagesData';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [imageCollection, setImageCollection] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [largeimageurl, setLargeImageURL] = useState('');

  // state = {
  //   searchText: '',
  //   imageCollection: null,
  //   page: 1,
  //   totalPage: 0,
  //   total: 0,
  //   loading: false,
  //   isShowModal: false,
  //   largeimageurl: '',
  // };

  const onSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value
      .trim()
      .toLowerCase();

    if (searchText !== searchValue) {
      setSearchText(searchValue);
      setPage(1);
      setLoading(true);

      setTimeout(() => {
        const data = fetchImagesData(searchValue, 1);
        data
          .then(collection => {
            const { hits, totalHits } = collection;
            setBasicState(totalHits);
            setImageCollection(hits);
          })
          .catch(err => {
            console.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);
    }
  };

  const toggleSpinner = spinnerStatus => {
    setLoading(spinnerStatus);
  };

  const setBasicState = total => {
    setTotalPage(Math.ceil(total / 15));
  };

  const updateImgCollection = collection => {
    setImageCollection(collection);
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(page + 1);
      const data = fetchImagesData(searchText, page + 1);
      data
        .then(collection => {
          setImageCollection([...imageCollection, ...collection.hits]);
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  };

  const handleImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      const selectedImg = e.target;
      const largeimageurl = selectedImg.getAttribute('largeimageurl');
      setLargeImageURL(largeimageurl);
      showModal();
    }
  };

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={onSubmit} />

      {searchText && (
        <ImageGallery
          searchText={searchText}
          imageCollection={imageCollection}
          page={page}
          totalPage={totalPage}
          setBasicState={setBasicState}
          updateImgCollection={updateImgCollection}
          toggleSpinner={toggleSpinner}
          handleImageClick={handleImageClick}
        />
      )}

      {loading && (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{ width: '100%' }}
          wrapperClass="dna-wrapper"
        />
      )}

      {imageCollection && totalPage > 1 && page < totalPage && (
        <Button handleClick={handleClick} />
      )}

      {isShowModal && (
        <Modal
          largeimageurl={largeimageurl}
          showModal={showModal}
          hideModal={hideModal}
          onClick={handleBackdropClick}
        />
      )}

      <GlobalStyle />
    </AppStyled>
  );
};
