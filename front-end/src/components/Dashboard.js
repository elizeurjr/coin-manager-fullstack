<<<<<<< HEAD
import styled from 'styled-components';

import Page from '../components/Page';
import { StyledContainer as Container } from './Auth';

export default function Dashboard({ background, children }) {
  return (
    <Page background={background}>
      <StyledContainer width="1040px" height="680px">
        {children}
      </StyledContainer>
    </Page>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  padding: 0;
  
  & > * {
    text-align: initial;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;
=======
import styled from 'styled-components';

import Page from '../components/Page';
import { StyledContainer as Container } from './Auth';

export default function Dashboard({ background, children }) {
  return (
    <Page background={background}>
      <StyledContainer width="1040px" height="680px">
        {children}
      </StyledContainer>
    </Page>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  padding: 0;
  
  & > * {
    text-align: initial;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;
>>>>>>> f8635ec35210507233f94112cb7aa20c22387894
