import { useState, useEffect } from 'react';
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
  const [imageCollection, setImageCollection] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [largeimageurl, setLargeImageURL] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value
      .trim()
      .toLowerCase();

    if (searchText !== searchValue) {
      setSearchText(searchValue);
      setPage(1);
      setImageCollection([]);
    }
  };

  useEffect(() => {
    if (searchText) {
      setLoading(true);
      setTimeout(() => {
        const data = fetchImagesData(searchText, page);
        data
          .then(collection => {
            setImageCollection(prevItems => [...prevItems, ...collection.hits]);
          })
          .catch(err => {
            console.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);
    }
  }, [page, searchText]);

  // useEffect(() => {
  //   console.log(page);
  //   console.log(searchText);
  //   console.log('Fetch data');
  // }, [page, searchText]);

  const toggleSpinner = spinnerStatus => {
    setLoading(spinnerStatus);
  };

  const setBasicState = total => {
    setTotalPage(Math.ceil(total / 15));
  };

  const updateImgCollection = collection => {
    setImageCollection(collection);
  };

  const loadMore = () => {
    setPage(page => page + 1);
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

      {imageCollection.length > 0 && <Button handleClick={loadMore} />}

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
