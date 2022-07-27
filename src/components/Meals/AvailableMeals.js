import { useEffect, useState } from 'react'

import Card from '../UI/Card/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://max-react-http-ec36c-default-rtdb.firebaseio.com/meals.json'
      )
      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals()
  }, [])

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      meal={meal}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  )
}

export default AvailableMeals
