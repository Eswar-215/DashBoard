import { useDispatch, useSelector } from 'react-redux'
import { removeWidgetFromCategory } from '../store/dashboardSlice.js'

export default function WidgetCard({ widgetId, categoryId }) {
  const dispatch = useDispatch()
  const widget = useSelector(s => s.dashboard.widgets.byId[widgetId])
  if (!widget) return null
  return (
    <div className="widget">
      <button className="close" title="Remove from this category"
        onClick={() => dispatch(removeWidgetFromCategory({ widgetId, categoryId }))}>×</button>
      <h4>{widget.name}</h4>
      <p>{widget.text}</p>
      <div className="kicker">ID: {widget.id}</div>
    </div>
  )
}