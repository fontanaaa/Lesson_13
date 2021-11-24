import React from "react";
import QualityForm from "../components/ui/qualityForm";
const AddQualityPage = () => {
  const handleSumbit = (data) => {
    console.log(data);
  };
  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm onSubmit={handleSumbit} />
    </>
  );
};

export default AddQualityPage;
