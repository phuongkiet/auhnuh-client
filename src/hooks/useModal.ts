import { useState, useCallback } from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [isOpenDetail, setIsOpenDetail] = useState(initialState);
  const [isOpenAdd, setIsOpenAdd] = useState(initialState);
  const [isOpenDelete, setIsOpenDelete] = useState(initialState);
  const [isOpenBan, setIsOpenBan] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const openModalDetail = useCallback(() => setIsOpenDetail(true), []);
  const openModalAdd = useCallback(() => setIsOpenAdd(true), []);
  const openModalDelete = useCallback(() => setIsOpenDelete(true), []);
  const openModalBan = useCallback(() => setIsOpenBan(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);
  const closeModalDetail = useCallback(() => setIsOpenDetail(false), []);
  const closeModalAdd = useCallback(() => setIsOpenAdd(false), []);
  const closeModalDelete = useCallback(() => setIsOpenDelete(false), []);
  const closeModalBan = useCallback(() => setIsOpenBan(false), []);

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, isOpenDetail, isOpenAdd, isOpenDelete, isOpenBan, openModal, openModalDetail, openModalAdd, openModalDelete, openModalBan, closeModal, closeModalDetail, closeModalAdd, closeModalDelete, closeModalBan, toggleModal };
};
