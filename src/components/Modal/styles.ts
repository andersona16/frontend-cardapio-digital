import styled from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  /* z-index: 1000; */
  overflow: auto;
`;

export const ModalContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: #fff;
  padding: 20px;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  z-index: 99999;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  color: #607699;
`;

export const CloseButton = styled.button`
  background: #ff5c5c;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
`;
