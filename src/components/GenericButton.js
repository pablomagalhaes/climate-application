import { StyledButton } from './styles.js';

const GenericButton = ({ 
  clickHandler, 
  city, 
  isLoading 
}) => {
  return (
    <>
      <StyledButton 
        onClick={() => clickHandler(city)}
        style={{ minWidth: 150 }}
        disabled={isLoading}
      >
        {city}
      </StyledButton>
    </>
  );
};

export default GenericButton;
