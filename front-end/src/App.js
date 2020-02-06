// ------- Dependencies ----------
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

// pragmatic learning and thinking
// -------Styling ---------
import './App.css';

// ------ Hooks ----------
import { axiosWithAuth } from './utils/axiosWithAuth'
import { PrivateRoute } from './components/PrivateRoute'

// -----History-----
import history from './history';

//----- Components -------
import Login from './components/Login'
import Register from './components/Register'
import { FoodLog } from './components/FoodLog'
import { Dashboard } from './components/Dashboard'
import { AddFoodForm } from './components/AddFoodForm'
import UserContext from './components/UserContext'
import TabNav from './components/TabNav'

// const foodArray = [
// 	{catFood: {
// 		date: '',
// 		dairy: '',
// 		fruits: '',
// 		grains: '',
// 		proteins: '',
// 		vegetables: '',
// 		treats: ''
// 	}},
// ]

//  -------- func ---------
function App() {
	const [petFoodLog, setPetFoodLog] = useState([])
	const [changeMade, setChange] = useState('')

	useEffect(() => {
		
			axiosWithAuth()
				.get(
					`https://gigapet2020.herokuapp.com/api/parents/food/${petFoodLog}`
					// localStorage.getItem('token')
				)
				.then(res => {
					setPetFoodLog(res.data)
				})
				.catch(err => console.log(err.res, 'Err'))
		
	}, [changeMade])

	return (
		<div className='App'>
			<TabNav />
			<UserContext.Provider value={{ petFoodLog, setChange, setPetFoodLog }}>
				{/* <h2> It's working in App.js {hardCode}</h2> */}
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				{/* <Link path='/login' component={Login} />
        <Link path='/register' component={Register} />  */}
				<PrivateRoute exact path='/' component={Dashboard} />
				<PrivateRoute exact path='/create' component={AddFoodForm} />
			</UserContext.Provider>
		</div>
	)
}

export default App
