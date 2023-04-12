import { ButtonWrapper, ButtonStyled } from './Button.styled';

export const Button = ({ handleClick }) => {
  return (
    <ButtonWrapper>
      <ButtonStyled type="button" onClick={handleClick}>
        Load More
      </ButtonStyled>
    </ButtonWrapper>
  );
};
