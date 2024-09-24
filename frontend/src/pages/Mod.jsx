import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Mod = ({ name, brand, model, yom, part, onClick, onDelete }) => {
  const [modData, setModData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchModData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/mod/search?brand=${brand}&model=${model}&part=${part}`);
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setModData(data);
        }
      } catch (error) {
        console.error('Error fetching mod data:', error);
        setErrorMessage('Error fetching mod data');
      }
    };

    fetchModData();
  }, [brand, model, part]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {name}
      </h1>
      <h1 className="text-gray-600 underline dark:text-gray-300">
        {brand} {model}
      </h1>
      <h1 className=" underline text-gray-600 dark:text-gray-300">
        {part}
      </h1>
      <br></br>
      {modData ? (
        <div>
          <h1 className=" text-black">ModMobili Suggestion:</h1>
          <h1 className="text-xl text-green-600">{modData.name}</h1>
          <br></br>
          <h1 className=" text-black">Price:</h1>
          <h1 className="text-xl text-green-600">${modData.price}</h1>
        </div>
      ) : (
        <h1 className="text-xl text-red-600">{errorMessage || 'Loading...'}</h1>
      )}
      <Button className='bg-green-600 text-black mr-2' onClick={onClick}>Update</Button>
      <Button className='bg-red-600 text-black' onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default Mod;
