'use client'

import { TabId } from '@/lib/types'

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'artists', label: 'Künstler:innen', icon: '🎨' },
  { id: 'sales', label: 'Verkäufe', icon: '💰' },
  { id: 'settings', label: 'Einstellungen', icon: '⚙️' },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[56px] transition-colors ${
            activeTab === tab.id
              ? 'text-accent'
              : 'text-gray-400'
          }`}
        >
          <span className="text-xl mb-0.5">{tab.icon}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
