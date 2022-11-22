import styled from "styled-components";

interface ISpinner {
  borderColor?: string;
  borderSize?: number | string;
}
const StyledSpinner = styled.div<ISpinner>`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: spin 2s linear infinite;
  border-radius: 100%;
  border: ${(props) => props.borderSize}px solid
    ${(props) => props.borderColor || "white"};
  border-right: ${(props) => props.borderSize}px solid transparent;
`;
const Spinner = ({
  width,
  height,
  color,
  borderSize,
}: {
  width: number;
  height: number;
  color?: string;
  borderSize?: number;
}) => {
  return (
    <StyledSpinner
      borderSize={borderSize}
      borderColor={color}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></StyledSpinner>
  );
};

export default Spinner;
