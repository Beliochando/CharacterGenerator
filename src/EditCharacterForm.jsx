import React from 'react';

export function EditCharacterForm({ editFormData, handleChange, saveEdit, cancelEdit }) {
  if (!editFormData) return null;

  return (
    <div className="card w-96 bg-base-100 card-sm shadow-sm p-4">
      <input
        name="name"
        value={editFormData.name}
        onChange={handleChange}
        className="input input-bordered mb-2"
        placeholder="Nombre"
      />
      <input
        name="age"
        value={editFormData.age}
        onChange={handleChange}
        className="input input-bordered mb-2"
        placeholder="Edad"
      />
      <input
        name="race"
        value={editFormData.race}
        onChange={handleChange}
        className="input input-bordered mb-2"
        placeholder="Raza"
      />
      <input
        name="ability"
        value={editFormData.ability}
        onChange={handleChange}
        className="input input-bordered mb-2"
        placeholder="Habilidad"
      />
      <div className="flex gap-2">
        <button onClick={saveEdit} className="btn btn-success">Guardar</button>
        <button onClick={cancelEdit} className="btn btn-neutral">Cancelar</button>
      </div>
    </div>
  );
}
