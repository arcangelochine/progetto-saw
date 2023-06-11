import { keyframes, styled } from "styled-components";
import { Center } from "./Containers";

const SpinnerBody = styled(Center)`
  height: 100vh;
`;

const rotate = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const InfiniteRotate = styled.div`
  animation: ${rotate} 2s linear infinite;
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid var(--text);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--text) transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <SpinnerBody>
      <InfiniteRotate>
        <SpinnerContainer>
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </SpinnerContainer>
      </InfiniteRotate>
    </SpinnerBody>
  );
};

export default Spinner;
