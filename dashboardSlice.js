import { createSlice, nanoid } from '@reduxjs/toolkit'
import initialData from '../data/initialData.json'

const initialState = initialData

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addCategory: {
      reducer(state, action) { state.categories.push(action.payload) },
      prepare(name) { return { payload: { id: 'cat-' + nanoid(6), name } } }
    },
    addWidget: {
      reducer(state, action) {
        const w = action.payload
        state.widgets.byId[w.id] = w
        state.widgets.allIds.unshift(w.id)
      },
      prepare({ name, text, categories }) {
        return { payload: { id: 'w-' + nanoid(6), name, text, categories: Array.from(new Set(categories)) } }
      }
    },
    removeWidgetFromCategory(state, action) {
      const { widgetId, categoryId } = action.payload
      const w = state.widgets.byId[widgetId]; if (!w) return
      w.categories = (w.categories || []).filter(c => c !== categoryId)
    },
    updateWidgetCategories(state, action) {
      const { widgetId, categories } = action.payload
      const w = state.widgets.byId[widgetId]; if (!w) return
      w.categories = Array.from(new Set(categories))
    },
    updateWidget(state, action) {
      const { id, name, text } = action.payload
      const w = state.widgets.byId[id]; if (!w) return
      if (typeof name === 'string') w.name = name
      if (typeof text === 'string') w.text = text
    },
  }
})
export const { addCategory, addWidget, removeWidgetFromCategory, updateWidgetCategories, updateWidget } = dashboardSlice.actions
export default dashboardSlice.reducer