import { useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { ICard } from "../../interface/interface";
import { CardImage, CardInfo, ContainerCardHover, EditButton } from "./styles";

const Cards = ({
  id,
  title,
  price,
  image,
  onEdit,
}: ICard & { id: number; onEdit: (id: number) => void }) => {
  const numberFormat = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format;
  }, []);

  return (
    <ContainerCardHover>
      <CardImage>
        <img src={image} alt={title} />
      </CardImage>

      <CardInfo>
        <h1>{title}</h1>
        <p>
          <b>{numberFormat(price)}</b>
        </p>
      </CardInfo>

      <EditButton onClick={() => onEdit(id)}>
        <FaEdit />
      </EditButton>
    </ContainerCardHover>
  );
};

export default Cards;
