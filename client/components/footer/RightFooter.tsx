import styled from "styled-components";
const footerItems = [
  "About",
  "Help",
  "Press",
  "Api",
  "Jobs",
  "Terms",
  "Locations",
  "Language",
];

const StyledRightFooter = styled.div`
  color: #c7c7c7;
  .footer-items-container {
    .footer-items {
      display: flex;
      flex-wrap: wrap;
      .footer-item {
        :hover {
          text-decoration: underline;
          cursor: pointer;
        }
        ::after {
          content: "\\00B7";
          margin: 0 3px;
          text-decoration: none;
        }
      }
    }
  }
  .about {
    margin-top: 16px;
  }
`;
const RightFooter = () => {
  return (
    <StyledRightFooter>
      <div className="footer-items-container">
        <div className="footer-items">
          {footerItems.map((item, index) => (
            <a className="footer-item" key={item}>
              {item}
            </a>
          ))}
        </div>
      </div>
      <div className="about">© 2022 INSTAGRAM FROM META</div>
    </StyledRightFooter>
  );
};

export default RightFooter;
