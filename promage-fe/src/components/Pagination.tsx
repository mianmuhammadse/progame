const Pagination = ({ totalProjects, projectsPerPage, onPageChange, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className={number === currentPage ? 'active' : ''}>
						<button onClick={() => onPageChange(number)}>{number}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
