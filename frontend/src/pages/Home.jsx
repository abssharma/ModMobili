import React, { useEffect, useState } from 'react';
import backgroundImage1 from '../assets/bg.gif'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import Mod from './Mod';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const LoggedInHome = () => {
  const [mods, setMods] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [modId, setModId] = useState(0);

  useEffect(() => {
    fetchMods();
  }, []);

  const fetchMods = () => {
    fetch('http://127.0.0.1:5000/mod/mods')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setMods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetching mods failed:', err);
        setError(true);
        setLoading(false);
      });
  };

  const closeModal = () => {
    setShow(false);
    reset();
  };

  const showModal = (id) => {
    setShow(true);
    setModId(id);

    const selectedMod = mods.find((mod) => mod.id === id);
    if (selectedMod) {
      setValue('name', selectedMod.name);
      setValue('brand', selectedMod.brand);
      setValue('model', selectedMod.model);
      setValue('yom', selectedMod.yom);
      setValue('part', selectedMod.part);
    }
  };

  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

  const updateMod = (data) => {
    console.log(data);
    
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}` 
      },
      body: JSON.stringify(data)
    };

    fetch(`http://127.0.0.1:5000/mod/mod/${modId}`, requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update the mod');
        }
        return res.json();
      })
      .then(data => {
        console.log('Mod updated:', data);
        fetchMods();  
        setMods((prevMods) =>
          prevMods.map((mod) => (mod.id === modId ? { ...mod, ...data } : mod))
        );
        closeModal();
      })
      .catch(err => {
        console.error('Error updating mod:', err);
      });
  };

  const deleteMod = (id) => {
    console.log(id);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}` 
      }
    };
    fetch(`http://127.0.0.1:5000/mod/mod/${id}`, requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete the mod');
        }
        return res.json();
      })
      .then(data => {
        console.log('Mod deleted:', data);
        fetchMods(); 
      })
      .catch(err => console.log('Error deleting mod:', err));
  };

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Modal show={show} size="lg" onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Update Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(updateMod)}>

            

          {/* Name */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: true, maxLength: 25 })}
              placeholder="Enter name for mod project"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.name && <p style={{ color: 'yellow' }}><small>Name is required</small></p>}
            {errors.name?.type === "maxLength" && <p style={{ color: 'yellow' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Brand */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Car Brand</Form.Label>
            <Form.Control
              type="text"
              {...register('brand', { required: true, maxLength: 25 })}
              placeholder="Enter car brand for mod project"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.brand && <p style={{ color: 'yellow' }}><small>Brand is required</small></p>}
            {errors.brand?.type === "maxLength" && <p style={{ color: 'yellow' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Model */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Car Model</Form.Label>
            <Form.Control
              type="text"
              {...register('model', { required: true, maxLength: 25 })}
              placeholder="Enter car model for mod project"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.model && <p style={{ color: 'yellow' }}><small>Model is required</small></p>}
            {errors.model?.type === "maxLength" && <p style={{ color: 'yellow' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* YOM */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">YOM</Form.Label>
            <Form.Control
              type="text"
              {...register('yom', { required: true, maxLength: 25 })}
              placeholder="Enter yom for mod project"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.yom && <p style={{ color: 'yellow' }}><small>YOM is required</small></p>}
            {errors.yom?.type === "maxLength" && <p style={{ color: 'yellow' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Part */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Part</Form.Label>
            <Form.Control
              type="text"
              {...register('part', { required: true, maxLength: 25 })}
              placeholder="Enter part for mod project"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.part && <p style={{ color: 'yellow' }}><small>Part is required</small></p>}
            {errors.part?.type === "maxLength" && <p style={{ color: 'yellow' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>


              <Form.Group>
                <Button variant="primary" className="w-full py-2" type="submit">
                  Save Preference
                </Button>
              </Form.Group>
            </form>
          </Modal.Body>
        </Modal>

        <h1 className="text-4xl font-bold text-white text-center mb-12">List of Projects</h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>Failed to load mods. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {mods.length === 0 ? (
              <div className="text-center text-gray-600">
                <p>No mods available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mods.map((mod) => (
                  <Mod
                    key={mod.id}

                    name={mod.name}
                    brand={mod.brand}
                    model={mod.model}
                    yom={mod.yom}
                    part={mod.part}

                    onClick={() => showModal(mod.id)}
                    onDelete={() => deleteMod(mod.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative text-white"
      style={{ backgroundImage: `url(${backgroundImage1})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to ModMobili</h1>
        <p className="mb-10 text-lg max-w-2xl">
          Discover and manage your mods with ease. Explore a wide range of projects and enhance your experience.
        </p>
        <Link
          to="/signup"
          className="px-12 py-3 bg-white text-black font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Start
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default Home;
