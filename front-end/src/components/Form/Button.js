<<<<<<< HEAD
import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function Button({ variant='contained', children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
  background-color: blue;
`;
=======
import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function Button({ variant='contained', children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
  background-color: blue;
`;
>>>>>>> f8635ec35210507233f94112cb7aa20c22387894
