import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './app.module.css';
import { AppHeader } from '../app-header';
import { FeedPlaces } from '../../pages/feed-places/feed-places';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<AppHeader />
<FeedPlaces />
    </>
  )
}

export default App
