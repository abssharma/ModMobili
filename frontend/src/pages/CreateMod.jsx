import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CreateMod = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);  // State to handle loading

  const createMod = (data) => {
    setLoading(true);  // Start the spinner
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    };
    
    fetch('http://127.0.0.1:5000/mod/mods', requestOptions)
      .then(res => res.json())
      .then(() => {
        reset();
        setLoading(false);  // Stop the spinner
      })
      .catch(err => {
        console.log(err);
        setLoading(false);  // Stop the spinner on error
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-16">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md transition-all transform hover:scale-105">
        <h1 className="text-black text-4xl font-bold mb-6 text-center">Create a Mod Project</h1>
        <form onSubmit={handleSubmit(createMod)}>

          {/* Name */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: true, maxLength: 25 })}
              placeholder="Enter name for mod project"
              className={`p-2 border rounded-md text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <small className="text-red-500">Name is required (Max 25 characters)</small>}
          </Form.Group>

          {/* Brand */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Vehicle Brand</Form.Label>
            <Form.Control
              type="text"
              {...register('brand', { required: true, maxLength: 25 })}
              placeholder="Enter brand for mod project"
              className={`p-2 border rounded-md text-black ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.brand && <small className="text-red-500">Brand is required (Max 25 characters)</small>}
          </Form.Group>

          {/* Model */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Vehicle Model</Form.Label>
            <Form.Control
              type="text"
              {...register('model', { required: true, maxLength: 25 })}
              placeholder="Enter model for mod project"
              className={`p-2 border rounded-md text-black ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.model && <small className="text-red-500">Model is required (Max 25 characters)</small>}
          </Form.Group>

          {/* YOM */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Year of Manufacture of Vehicle</Form.Label>
            <Form.Control
              type="text"
              {...register('yom', { required: true })}
              placeholder="Enter Year of Manufacture"
              className={`p-2 border rounded-md text-black ${errors.yom ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.yom && <small className="text-red-500">Year of Manufacture is required</small>}
          </Form.Group>

          {/* Part */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Part to be Modded</Form.Label>
            <Form.Control
              type="text"
              {...register('part', { required: true })}
              placeholder="Enter part for mod project"
              className={`p-2 border rounded-md text-black ${errors.part ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.part && <small className="text-red-500">Part is required (Max 25 characters)</small>}
          </Form.Group>

          {/* Save Button */}
          <Form.Group>
            <Button variant="primary" className="w-full py-2 flex justify-center items-center" type="submit" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save Mod'}
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default CreateMod;
