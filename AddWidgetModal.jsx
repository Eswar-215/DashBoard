import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWidget } from '../store/dashboardSlice.js'

export default function AddWidgetModal({ onClose, presetCategoryId }) {
  const dispatch = useDispatch()
  const categories = useSelector(s => s.dashboard.categories)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [selected, setSelected] = useState(new Set(presetCategoryId ? [presetCategoryId] : []))
  const canSave = name.trim().length > 0 && selected.size > 0

  function toggle(id) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelected(next)
  }
  function save() {
    if (!canSave) return
    dispatch(addWidget({ name: name.trim(), text: text.trim() || 'Random text', categories: Array.from(selected) }))
    onClose?.()
  }
  return (
    <div className="modal-backdrop" onClick={(e)=>{ if(e.target.classList.contains('modal-backdrop')) onClose?.() }}>
      <div className="modal">
        <h3 style={{marginTop:0}}>Add Widget</h3>
        <div className="form-row"><label>Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Vulnerabilities by Severity" /></div>
        <div className="form-row"><label>Text</label>
          <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="(Optional) random text" /></div>
        <div className="form-row"><label>Categories</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8}}>
            {categories.map(c => (
              <label key={c.id} className="checkbox-row">
                <input type="checkbox" checked={selected.has(c.id)} onChange={()=>toggle(c.id)} />
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="hr" />
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="button" onClick={onClose}>Cancel</button>
          <button className="button primary" disabled={!canSave} onClick={save}>Save Widget</button>
        </div>
        <div className="help" style={{marginTop:10}}>Tip: a widget can belong to multiple categories.</div>
      </div>
    </div>
  )
}