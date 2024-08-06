import React, { useRef, useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../services/api";
import InputForm from "../../InputForm";
import {
  ContainerButton,
  ContainerFile,
  ContainerForm,
  ImageContainer,
  ImagePreview,
  TrashIcon,
} from "./styles";

interface FormData {
  title: string;
  price: string;
  image: string;
}

interface FormErrors {
  title?: string;
  price?: string;
  image?: string;
}

interface AddNewFoodProps {
  onSuccess: () => void;
  itemId?: number | null;
  onClose: () => void;
  isOpen: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("O nome do produto é obrigatório."),
  price: Yup.number()
    .required("O preço do produto é obrigatório.")
    .positive("O preço deve ser um número positivo.")
    .typeError("O preço deve ser um número."),
  image: Yup.string().required("A imagem do produto é obrigatória."),
});

const AddNewFood: React.FC<AddNewFoodProps> = ({
  onSuccess,
  itemId,
  onClose,
  isOpen,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemId) {
      const fetchItemData = async () => {
        try {
          const response = await api.get(`/food/${itemId}`);
          setFormData({
            title: response.data.title,
            price: response.data.price,
            image: response.data.image,
          });
          setIsEditing(true);
        } catch (error) {
          toast.error("Erro ao carregar os dados do item.");
        }
      };

      fetchItemData();
    } else {
      setIsEditing(false);
    }
  }, [itemId]);

  useEffect(() => {
    if (!isOpen) {
      clearForm();
      setIsEditing(false);
    }
  }, [isOpen]);

  const validateForm = useCallback(async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            image: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValid = await validateForm();
      if (!isValid) {
        return;
      }

      const dataToSend = {
        title: formData.title,
        price: formData.price,
        image: formData.image,
      };

      try {
        if (isEditing && itemId) {
          await api.put(`/food/${itemId}`, dataToSend);
          toast.success("Dados atualizados com sucesso!");
        } else {
          await api.post("/food", dataToSend);
          toast.success("Dados enviados com sucesso!");
        }
        onSuccess();
        clearForm();
        onClose();
      } catch (error) {
        toast.error("Erro ao enviar o formulário!");
      }
    },
    [formData, itemId, isEditing, onSuccess, validateForm, onClose]
  );

  const handleDelete = useCallback(async () => {
    if (!itemId) return;

    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este item?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/food/${itemId}`);
      toast.success("Item excluído com sucesso!");

      onSuccess();
      clearForm();
      onClose();
    } catch (error) {
      toast.error("Erro ao excluir o item!");
    }
  }, [itemId, onSuccess, onClose]);

  const clearForm = useCallback(() => {
    setFormData({
      title: "",
      price: "",
      image: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <ContainerForm onSubmit={handleSubmit}>
      <div>
        <InputForm
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          label="Nome do produto"
        />

        <InputForm
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          label="Preço do Produto"
        />

        <ContainerFile>
          <label>Imagem do Produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {formData.image && (
            <ImageContainer>
              <ImagePreview>
                <img src={formData.image} alt="Preview" />
                <TrashIcon onClick={handleRemoveImage} />
              </ImagePreview>
            </ImageContainer>
          )}
        </ContainerFile>

        <ContainerButton>
          <button type="submit">{isEditing ? "Atualizar" : "Adicionar"}</button>
          {isEditing && (
            <button type="button" onClick={handleDelete}>
              Excluir
            </button>
          )}
        </ContainerButton>
      </div>
    </ContainerForm>
  );
};

export default AddNewFood;
