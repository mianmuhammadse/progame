import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Task {
	id: number;
	startDate: string;
	endDate: string;
	description: string;
	status: string;
}

const ProjectDetails = () => {
	const { id } = useParams();
	console.log(id);
	const [tasks, setTasks] = useState<Task[]>([]);
	console.log(tasks);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/v1/tasks/project/${id}`);
				setTasks(response.data);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};
		fetchTasks();
	}, [id]);

	return (
		<div>
			<h2>Project Details</h2>
			<table className="tasks-table">
				<thead>
					<tr>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Description</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => (
						<tr key={task.id}>
							<td>{new Date(task.startDate).toLocaleString()}</td>
							<td>{new Date(task.endDate).toLocaleString()}</td>
							<td>{task.description}</td>
							<td>{task.status}</td>
							<td>
								<button>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectDetails;
