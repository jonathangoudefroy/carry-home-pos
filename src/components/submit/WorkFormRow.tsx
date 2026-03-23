'use client'

interface WorkFormRowProps {
  title: string
  price: string
  medium: string
  onTitleChange: (v: string) => void
  onPriceChange: (v: string) => void
  onMediumChange: (v: string) => void
  onRemove: () => void
  canRemove: boolean
}

export function WorkFormRow({ title, price, medium, onTitleChange, onPriceChange, onMediumChange, onRemove, canRemove }: WorkFormRowProps) {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1 space-y-2">
        <input
          placeholder="Titel *"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#FE4F40] bg-white min-h-[44px]"
        />
        <div className="flex gap-2">
          <input
            placeholder="Medium (z.B. Acryl)"
            value={medium}
            onChange={e => onMediumChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#FE4F40] bg-white min-h-[44px]"
          />
          <input
            placeholder="Preis € *"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={e => onPriceChange(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#FE4F40] bg-white min-h-[44px]"
          />
        </div>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-400 text-lg mt-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          &times;
        </button>
      )}
    </div>
  )
}
