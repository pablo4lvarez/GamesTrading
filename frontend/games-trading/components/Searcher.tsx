import React from 'react'

const Searcher = () => {
  return (
    <div className='min-h-screen bg-base-200 '>
      <div className='max-w-screen flex justify-center'>
        <select className="select select-secondary w-1/2 max-w-fill my-8 mx-20">
          <option disabled selected>Escoge el filtro deseado</option>
          <option>Sin Filtro</option>
          <option>Deseos</option>
          <option>Ofertas</option>
        </select>
        <input type="search" placeholder="Buscar" className="input input-bordered input-primary w-1/2 max-w-fill my-8 mx-20" />
      </div>
    </div>
  )
}

export default Searcher