import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './app.module.css';
import { AppHeader } from '../app-header';
import { FeedPlaces } from '../../pages/feed-places/feed-places';
import { Place } from '../../pages/place/place';
import { Dish } from '../../pages/dish/dish';
import { Visit } from '../../pages/visit/visit';
import { FormOfNewVisit } from '../../pages/form-new-visit/form-new-visit';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<AppHeader />
 <FeedPlaces /> 
{/* <Place/>
<Dish/>
<Visit/> */}
{/* <FormOfNewVisit/>  */}

    </>
  )
}

export default App
