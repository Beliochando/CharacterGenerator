import { FaBirthdayCake, FaUserAlt, FaMagic } from "react-icons/fa";

export function CardCharacter({ character, onDelete, onEdit }) {
  if (!character) return null;


return (
    <div className="card w-96 bg-base-100 card-sm shadow-sm">
      <div className="card-body items-center text-center text-[16px]">
        {character.image && (
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-30 h-30 rounded-full object-cover border-2 border-gray-300 mb-4" 
        />
      )}
        <h2 className="card-title text-2xl font-bold">{character.name}</h2>
        
        <p>
          <FaBirthdayCake className="inline-block mr-2 text-success" />
          <strong>Edad:</strong> {character.age}
        </p>
        
        <p>
          <FaUserAlt className="inline-block mr-2 text-success" />
          <strong>Raza:</strong> {character.race}
        </p>
        
        <p>
          <FaMagic className="inline-block mr-2 text-success" />
          <strong>Habilidad:</strong> {character.ability}
        </p>
      </div>
      <div className="justify-end card-actions flex gap-2 mt-6">
          <button onClick={onEdit} className="btn btn-soft shadow-none">Editar</button>
          <button onClick={onDelete} className="btn btn-neutral shadow-none">Eliminar</button>
        </div>
    </div>
  );
}
