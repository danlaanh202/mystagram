import styled from "styled-components";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
const StyledToggleVoiceIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ToggleVoiceIcon = ({ isOn }: { isOn: boolean }) => {
  return (
    <StyledToggleVoiceIcon>
      {isOn ? (
        <KeyboardVoiceIcon />
      ) : (
        <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
          <path d="M18 6.998c1.28 0 2.418.6 3.15 1.535.27.344.188.826-.121 1.135l-5.826 5.825a.695.695 0 0 1-1.202-.496L14 13.998v-3a4 4 0 0 1 4-4zM12 16.498c0 .5.061.985.176 1.45a.811.811 0 0 1-.199.771l-.846.847c-.362.361-.971.261-1.143-.221a8.486 8.486 0 0 1-.488-2.847v-.5a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5zM13.627 20.606l-1.769 1.768-4.492 4.493a1.25 1.25 0 1 0 1.768 1.768l4.181-4.181c.317-.317.803-.379 1.212-.196a8.44 8.44 0 0 0 1.798.575.522.522 0 0 1 .425.506v.659a.5.5 0 0 1-.5.5H13.5a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-.5a1 1 0 0 0-1-1h-2.75a.5.5 0 0 1-.5-.5v-.66c0-.248.182-.456.425-.505a8.503 8.503 0 0 0 6.825-8.335v-.5a1 1 0 0 0-1-1H25a1 1 0 0 0-1 1v.5a6 6 0 0 1-7.57 5.792c-.345-.093-.432-.519-.18-.771l.712-.712c.23-.23.555-.325.878-.312A4 4 0 0 0 22 16.498c0-.467.186-.915.516-1.245l6.119-6.12a1.25 1.25 0 1 0-1.768-1.767L22 12.233l-6.958 6.957-1.415 1.416z"></path>
        </svg>
      )}
    </StyledToggleVoiceIcon>
  );
};

export default ToggleVoiceIcon;
