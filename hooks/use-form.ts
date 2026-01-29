import { useState } from "react";



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