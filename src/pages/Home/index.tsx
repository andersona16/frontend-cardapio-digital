import { useState, useEffect, useCallback } from "react";
import Cards from "../../components/Card";
import LoadingPage from "../../components/LoadingPage";
import api from "../../services/api";
import {
  Container,
  CardsContainer,
  PaginationControls,
  ContainerHeader,
  FloatingButton,
} from "./styles";
import { ICard } from "../../interface/interface";
import Modal from "../../components/Modal";
import AddNewFood from "../../components/Modal/AddNewFood";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listFood, setListFood] = useState<ICard[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null); // Alterar para número

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/food?page=${currentPage}`);
      setListFood(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (id: number) => {
    setEditItemId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItemId(null);
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <FloatingButton onClick={() => openModal(0)}>
            Adicionar Novo Item
          </FloatingButton>

          <ContainerHeader>
            <h1>Listagem de comidas</h1>
          </ContainerHeader>

          <CardsContainer>
            {listFood.length > 0 ? (
              listFood.map((item) => (
                <Cards
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  title={item.title}
                  image={item.image}
                  onEdit={openModal} // Passar a função openModal
                />
              ))
            ) : (
              <p>Nenhuma comida encontrada.</p>
            )}
          </CardsContainer>

          <PaginationControls>
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Próxima
            </button>
          </PaginationControls>

          <Modal
            title={editItemId ? "Editar item" : "Adicionar novo item"}
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <AddNewFood
              onSuccess={fetchData}
              itemId={editItemId}
              onClose={closeModal}
              isOpen={isModalOpen}
            />
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Home;
