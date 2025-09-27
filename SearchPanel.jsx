import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export default function SearchPanel() {
  const [q, setQ] = useState('')
  const categories = useSelector(s => s.dashboard.categories)
  const widgets = useSelector(s => s.dashboard.widgets)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const list = widgets.allIds.map(id => widgets.byId[id])
    if (!term) return list.slice(0, 9)
    return list.filter(w => (w.name + ' ' + (w.text || '')).toLowerCase().includes(term)).slice(0, 30)
  }, [q, widgets])

  const nameOf = (id) => categories.find(c => c.id === id)?.name || id

  return (
    <div className="search-panel">
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input className="input" placeholder="Search all widgets..." value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}} />
        <span className="badge">{results.length} result{results.length === 1 ? '' : 's'}</span>
      </div>
      <div className="search-results">
        {results.map(w => (
          <div className="result" key={w.id}>
            <h5>{w.name}</h5>
            <div className="kicker">{w.text}</div>
            <div className="pills" style={{marginTop:8}}>
              {(w.categories||[]).map(cid => <span className="pill" key={cid}>{nameOf(cid)}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}