import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

export const ContainerForm = styled.form`
  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 150px;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const TrashIcon = styled(FaTrash)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 10;

  color: white;
`;

export const ContainerFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 15px;
`;
