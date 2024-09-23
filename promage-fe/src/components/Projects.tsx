import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import ProjectDetails from './ProjectDetails';
import { Link } from 'react-router-dom';

interface Project {
	id: number;
	name: string;
	manager: string;
	startDate: string;
	endDate: string;
	isRunning: boolean;
}

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
	const projectsPerPage = 10;

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get('http://localhost:3000/v1/projects');
				setProjects(response.data);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};
		fetchProjects();
	}, []);

	const indexOfLastProject = currentPage * projectsPerPage;
	const indexOfFirstProject = indexOfLastProject - projectsPerPage;
	const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleRowClick = (id: number) => {
		setSelectedProjectId(id);
	};

	return (
		<div>
			<h1>Projects</h1>
			<button>New Project</button>
			<table className="projects-details">
				<thead>
					<tr>
						<th>Name</th>
						<th>Manager</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Is Running</th>
					</tr>
				</thead>
				<tbody>
					{currentProjects.map((project) => (
						<tr key={project.id} onClick={() => handleRowClick(project.id)}>
							<td>
								<Link to={`/projects/${project.id}`}>{project.name}</Link>
							</td>
							<td>{project.manager.name}</td>
							<td>{new Date(project.startDate).toLocaleDateString()}</td>
							<td>{new Date(project.endDate).toLocaleDateString()}</td>
							<td>{project.isRunning ? '✔️' : '❌'}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				totalProjects={projects.length}
				projectsPerPage={projectsPerPage}
				onPageChange={handlePageChange}
				currentPage={currentPage}
			/>

			{selectedProjectId && <ProjectDetails projectId={selectedProjectId} />}
		</div>
	);
};

export default Projects;
