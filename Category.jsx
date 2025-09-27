import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import WidgetCard from './WidgetCard.jsx'
import AddWidgetModal from './AddWidgetModal.jsx'

export default function Category({ category }) {
  const [open, setOpen] = useState(false)
  const widgets = useSelector(s => s.dashboard.widgets)
  const items = useMemo(() =>
    widgets.allIds.filter(id => (widgets.byId[id].categories || []).includes(category.id)),
    [widgets, category.id]
  )
  return (
    <div className="card">
      <div className="category-header">
        <div className="category-title">{category.name}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="button small" onClick={()=>setOpen(true)}>+ Add Widget</button>
        </div>
      </div>
      <div className="widget-grid">
        {items.map(id => <WidgetCard key={id} widgetId={id} categoryId={category.id} />)}
        {items.length === 0 && <div className="kicker">No widgets yet. Click “+ Add Widget”.</div>}
      </div>
      {open && <AddWidgetModal presetCategoryId={category.id} onClose={()=>setOpen(false)} />}
    </div>
  )
}