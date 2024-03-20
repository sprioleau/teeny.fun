"use client";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContextProvider";

export default function useModal() {
	return useContext(ModalContext);
}
