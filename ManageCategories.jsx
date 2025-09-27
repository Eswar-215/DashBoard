import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../store/dashboardSlice.js'

export default function ManageCategories() {
  const dispatch = useDispatch()
  const categories = useSelector(s => s.dashboard.categories)
  const [name, setName] = useState('')

  const add = () => {
    const n = name.trim(); if (!n) return
    dispatch(addCategory(n)); setName('')
  }

  return (
    <div className="card" style={{gridColumn:'span 12'}}>
      <div className="category-header">
        <div className="category-title">Manage Categories</div>
        <div className="kicker">Add new categories for organizing widgets</div>
      </div>
      <div className="form-row">
        <input className="input" placeholder="New category name..." value={name} onChange={e=>setName(e.target.value)} style={{flex:1}} />
        <button className="button primary" onClick={add} disabled={!name.trim()}>Add Category</button>
      </div>
      <div className="kicker" style={{marginTop:8}}>
        Current: {categories.map(c => c.name).join(' • ') || 'None yet'}
      </div>
    </div>
  )
}