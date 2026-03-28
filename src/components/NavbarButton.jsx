import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const NavbarButton = (props) => {
  return (
    <StyledWrapper $theme={props.$theme}>
      <a
        href="https://github.com/rayhanzz772"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-button"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/mrma772/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-button"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://instagram.com/rayhan.maul"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-button"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
    </StyledWrapper>
    
  );
};

const StyledWrapper = styled.div`
  display: flex;
  gap: 20px;

  .icon-button {
    color: ${(props) => (props.$theme === "dark" ? "white" : "black")};
    font-size: 32px;
    transition: transform 0.3s ease;
  }

  .icon-button:hover {
    transform: scale(1.2);
  }

  .icon-button:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    gap: 12px;

    .icon-button {
      font-size: 24px;
    }
  }
`;

export default NavbarButton;
