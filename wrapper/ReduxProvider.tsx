"use client"
import { Provider } from "react-redux";
import { ChildrenInterface } from "@/types";
import { store } from "@/store/store";
export default function ReduxProvider({ children }:ChildrenInterface) {
  
    return <Provider store={store}>{children}</Provider>;
 
}
