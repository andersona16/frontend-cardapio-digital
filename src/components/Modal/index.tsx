import React, { useEffect } from "react";
import {
  CloseButton,
  Header,
  ModalContent,
  ModalOverlay,
  Title,
} from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onClear?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onClear,
}) => {
  useEffect(() => {
    if (!isOpen && onClear) {
      onClear();
    }
  }, [isOpen, onClear]);

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={onClose}>
        <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose}>X</CloseButton>
          </Header>
          {children}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Modal;
