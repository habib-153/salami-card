/* eslint-disable react/prop-types */

import { useForm } from 'react-hook-form';
import { Input, Button } from "@material-tailwind/react";

const CardForm = ({handleCardGeneration}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
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

      <label className="block text-left font-bold  my-2">
        Bkash:
      </label>
      <Input type="text" label='Number'  color='teal' {...register('bkash', { minLength: 11})} />
      {errors.bkash?.type === 'minLength' && (
        <p className="text-red-500 text-xs">Enter a valid number</p>
      )}
      <label className="block text-left font-bold  my-2">
        Nagad:
      </label>
      <Input type="text" label='Number'  color='teal' {...register('nagad', { minLength: 11})} />
      {errors.nagad?.type === 'minLength' && (
        <p className="text-red-500 text-xs">Enter a valid number</p>
      )}
      <label className="block text-left font-bold  my-2">
        Rocket:
      </label>
      <Input type="text" label='Number'  color='teal' {...register('rocket', { minLength: 11})} />
      {errors.rocket?.type === 'minLength' && (
        <p className="text-red-500 text-xs">Enter a valid number</p>
      )}
      <label className="block text-left font-bold  my-2">
        Upay:
      </label>
      <Input type="text" label='Number'  color='teal' {...register('upay', { minLength: 11})} />
      {errors.upay?.type === 'minLength' && (
        <p className="text-red-500 text-xs">Enter a valid number</p>
      )}

      <label htmlFor="photo" className="block text-left font-bold  mt-4 my-2">
        Photo:
      </label>
      <Input label='Image' color='teal' type="file" id="photo" {...register('photo')} accept="image/*" />
      {errors.photo && <p className="text-red-500 text-xs">Photo is required</p>}

      <div className='w-full text-center'>
        <Button type="submit" className="mt-4 mx-auto" >
        Generate Card
      </Button>
      </div>
      
    </form>
    </div>
    
  );
};

export default CardForm;