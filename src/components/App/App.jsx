import { Component } from 'react';
import { Dna } from 'react-loader-spinner';

import { GlobalStyle } from 'components/GlobalStyle';
import { AppStyled } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fetchImagesData } from 'components/Services/fetchImagesData';

export class App extends Component {
  state = {
    searchText: '',
    imageCollection: null,
    page: 1,
    totalPage: 0,
    total: 0,
    loading: false,
    isShowModal: false,
    largeimageurl: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value
      .trim()
      .toLowerCase();

    if (this.state.searchText !== searchValue) {
      this.setState({
        searchText: searchValue,
        page: 1,
        loading: true,
      });
      setTimeout(() => {
        const data = fetchImagesData(searchValue, this.state.page);
        data
          .then(collection => {
            const { hits, totalHits } = collection;
            this.setBasicState(totalHits);
            this.setState({
              imageCollection: hits,
            });
          })
          .catch(err => {
            console.error(err.message);
          })
          .finally(() => {
            this.setState({
              loading: false,
            });
          });
      }, 500);
    }
  };

  toggleSpinner = spinnerStatus => {
    this.setState({
      loading: spinnerStatus,
    });
  };

  setBasicState = total => {
    this.setState({
      totalPage: Math.ceil(total / 15),
      total,
    });
  };

  updateImgCollection = collection => {
    this.setState({
      imageCollection: collection,
    });
  };

  handleClick = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      const data = fetchImagesData(this.state.searchText, this.state.page + 1);
      data
        .then(collection => {
          this.setState(prevState => ({
            page: prevState.page + 1,
            imageCollection: [...prevState.imageCollection, ...collection.hits],
          }));
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }, 500);
  };

  handleImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      const selectedImg = e.target;
      const largeimageurl = selectedImg.getAttribute('largeimageurl');
      this.setState({
        largeimageurl,
      });
      this.showModal();
    }
  };

  showModal = () => {
    this.setState({
      isShowModal: true,
    });
  };

  hideModal = () => {
    this.setState({
      isShowModal: false,
    });
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.hideModal();
    }
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />

        {this.state.searchText && (
          <ImageGallery
            searchText={this.state.searchText}
            imageCollection={this.state.imageCollection}
            page={this.state.page}
            totalPage={this.state.totalPage}
            setBasicState={this.setBasicState}
            updateImgCollection={this.updateImgCollection}
            toggleSpinner={this.toggleSpinner}
            handleImageClick={this.handleImageClick}
          />
        )}

        {this.state.loading && (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ width: '100%' }}
            wrapperClass="dna-wrapper"
          />
        )}

        {this.state.imageCollection &&
          this.state.totalPage > 1 &&
          this.state.page < this.state.totalPage && (
            <Button handleClick={this.handleClick} />
          )}

        {this.state.isShowModal && (
          <Modal
            largeimageurl={this.state.largeimageurl}
            showModal={this.showModal}
            hideModal={this.hideModal}
            onClick={this.handleBackdropClick}
          />
        )}

        <GlobalStyle />
      </AppStyled>
    );
  }
}
