import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
  const [form, setForm] = useState(initialState);
  const handleSumbit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };
  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  return { handleChange, form, handleSumbit };
};
export default useForm;
