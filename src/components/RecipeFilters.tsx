import React, { useState } from 'react';

export interface Filters {
  search?: string
  maxCookingTime?: number
  minIngredients?: number
}

interface Props {
  value: Filters
  onChange: (newFilters: Filters) => void
  onClose: () => void
}

export default function RecipeFilters({ value, onChange, onClose }: Props) {
  const [local, setLocal] = useState<Filters>(value)

  const applyFilters = () => {
    onChange(local)
    onClose()
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow mb-4">
      <h2 className="font-semibold mb-2">Filters</h2>

      <input
        className="w-full mb-2 border p-2"
        placeholder="Search by name"
        value={local.search || ''}
        onChange={(e) => setLocal({ ...local, search: e.target.value })}
      />

      <input
        type="number"
        className="w-full mb-2 border p-2"
        placeholder="Max cooking time"
        value={local.maxCookingTime ?? ''}
        onChange={(e) =>
          setLocal({ ...local, maxCookingTime: Number(e.target.value) || undefined })
        }
      />

      <input
        type="number"
        className="w-full mb-2 border p-2"
        placeholder="Min ingridients"
        value={local.minIngredients ?? ''}
        onChange={(e) =>
          setLocal({ ...local, minIngredients: Number(e.target.value) || undefined })
        }
      />

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cansel
        </button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  )
}
