import { useState } from "react";

export type UseFormReturn<G> = {
  getForm: G;
  resetForm: () => void;
  handleInputChange: <K extends keyof G>(name: K, value: G[K]) => void;
};

const useForm = <T>( initForm:T ) => {
    const [form, setForm] = useState(initForm)
    const handleInputChange = <K extends keyof T> (name: K, value: T[K]) => {
        // alert(value)
        setForm({
            ...form,
            [name]: value,
        });
    };
    const resetForm = () =>{
        setForm(initForm)
    }
    const getForm = form
    return {
        getForm,
        resetForm,
        handleInputChange
    }
}

export default useForm