/* eslint-disable react/prop-types */

import { useForm } from 'react-hook-form';
import { Input, Button } from "@material-tailwind/react";

const CardForm = ({handleCardGeneration}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    // Implement logic to process uploaded photo (if needed)
    // ... your photo handling logic here
    console.log(formData); // For now, log the submitted data
    handleCardGeneration(formData)
  };

  return (
    <div className='max-w-96 mx-auto'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="block text-left my-2 font-bold ">
        Name:
      </label>
      <Input type="text" label='Name' color='teal' id="name" {...register('name', { required: true })} />
      {errors.name && <p className="text-red-500 text-xs">Name is required</p>}

      <label htmlFor="bkashNagadNumber" className="block text-left font-bold  my-2">
        Bkash/Nagad Number:
      </label>
      <Input type="text" label='Number'  color='teal' id="bkashNagadNumber" {...register('bkashNagadNumber', { required: true })} />
      {errors.bkashNagadNumber && (
        <p className="text-red-500 text-xs">Bkash/Nagad Number is required</p>
      )}

      <label htmlFor="photo" className="block text-left font-bold  mt-4 my-2">
        Photo:
      </label>
      <Input label='Image' color='teal' type="file" id="photo" {...register('photo')} accept="image/*" />
      {errors.photo && <p className="text-red-500 text-xs">Photo is required</p>}

      <Button type="submit" className="mt-4" >
        Generate Card
      </Button>
    </form>
    </div>
    
  );
};

export default CardForm;