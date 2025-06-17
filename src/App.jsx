import { useState, useEffect } from 'react'
import './App.css'
import { CardCharacter } from './CardCharacter.jsx'
import { EditCharacterForm } from './EditCharacterForm.jsx';
import './App.css';


function App() {

  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('characters');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const names = ["Eldrin", "Thora", "Borin", "Lira", "Kael", "Nyra", "Dorian", "Zarek"];
  const races = ["Humano", "Elfo", "Enano", "Orco", "Goblin", "Dracónido"];
  const abilities = ["Volar", "Invisibilidad", "Superfuerza", "Telepatía", "Control del fuego", "Sanación rápida"];
  const age = ["20", "17", "25", "18", "20", "22", "25", "28", "30", "33", "36", "40", "45", "50", "60", "70" ]

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generateCharacter = async () => {
  const newCharacter = {
    name: getRandomItem(names),
    age: getRandomItem(age),
    race: getRandomItem(races),
    ability: getRandomItem(abilities),
  };

  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    // La URL de la imagen está en data.results[0].picture.large
    newCharacter.image = data.results[0].picture.large;
  } catch (error) {
    console.error('Error fetching image:', error);
    newCharacter.image = null; // fallback si da error
  }

  setCharacters(prev => [...prev, newCharacter]);
};


useEffect(() => {
  localStorage.setItem('characters', JSON.stringify(characters));
  console.log(characters);
}, [characters]);

const startEditing = (index) => {
  setEditingIndex(index);
  setEditFormData({ ...characters[index] });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditFormData(prev => ({ ...prev, [name]: value }));
};

const saveEdit = () => {
  setCharacters(prev => prev.map((char, i) => i === editingIndex ? editFormData : char));
  setEditingIndex(null);
  setEditFormData(null);
};

const cancelEdit = () => {
  setEditingIndex(null);
  setEditFormData(null);
};



const deleteCharacter = (indexToDelete) => {
  setCharacters(prev => prev.filter((_, i) => i !== indexToDelete));
};

  return (
    <div className="p-4 flex items-start gap-12">
      <div className="shrink-0">
        <button 
          onClick={generateCharacter}
          className=" text-xl font-medium bg-black text-white px-4 py-4 rounded"
        >
          Generar Personaje
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((character, index) => (
          editingIndex === index ? (
            <EditCharacterForm
              key={index}
              editFormData={editFormData}
              handleChange={handleChange}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />
          ) : (
            <CardCharacter
              key={index}
              character={character}
              onDelete={() => deleteCharacter(index)}
              onEdit={() => startEditing(index)}
            />
          )
        ))}
        </div>
   
    </div>
  );
}

export default App
