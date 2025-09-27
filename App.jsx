import Dashboard from './components/Dashboard.jsx'
import ManageCategories from './components/ManageCategories.jsx'
import SearchPanel from './components/SearchPanel.jsx'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <div className="brand">Trainee Dashboard</div>
          {/* <span className="badge">React + Redux Toolkit</span> */}
        </div>
        <div className="kicker">Dynamic widgets by category • Add / remove • Global search</div>
      </header>

      <Dashboard />
      <SearchPanel />
      <ManageCategories />

      <footer>Built for the assignment: categories with widgets using a JSON-driven store, add/remove widgets, and search.</footer>
    </div>
  )
}