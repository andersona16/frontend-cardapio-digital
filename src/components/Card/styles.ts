import styled from "styled-components";

export const ContainerCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  transition: box-shadow 0.3s;

  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const CardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const CardInfo = styled.div`
  padding: 15px;
  text-align: center;

  h1 {
    font-size: 18px;
    margin: 0 0 10px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
  z-index: 10;
  opacity: 0;
  visibility: hidden;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  svg {
    color: #fff;
    font-size: 20px;
  }
`;

export const ContainerCardHover = styled(ContainerCard)`
  &:hover ${EditButton} {
    opacity: 1;
    visibility: visible;
  }
`;
