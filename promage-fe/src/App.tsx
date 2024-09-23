import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
