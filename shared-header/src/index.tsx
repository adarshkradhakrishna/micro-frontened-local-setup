import {createRoot} from 'react-dom/client'
import HeaderComponent from './components/HeaderComponent'

const container= document.getElementById('root')
const root =createRoot(container)
root.render(<HeaderComponent />)

