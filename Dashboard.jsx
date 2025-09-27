
import { useSelector } from "react-redux"
import Category from "./Category.jsx"

export default function Dashboard() {
  const categories = useSelector(s => s.dashboard.categories)
  return (
    <div className="grid">
      {categories.map(c => <Category key={c.id} category={c} />)}
    </div>
  )
}

