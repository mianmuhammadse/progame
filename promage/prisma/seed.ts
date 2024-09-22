import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const managerData: Prisma.ManagerCreateInput[] = [
	{
		name: 'Alice',
		email: 'alice@company.com',
		projects: {
			create: [
				{
					name: 'Project Alpha',
          startDate: new Date('2024-12-17T03:24:00'),
          endDate: new Date('2024-12-20T03:24:00'),
					tasks: {
						create: [
							{
								description: 'Create the initial design for the UI.',
								status: 'REJECTED',
                startDate: new Date('2024-12-01'),
                endDate: new Date('2024-12-31'),
							},
							{
								description: 'Configure the database schema.',
								status: 'COMPLETED',
                startDate: new Date('2024-12-01'),
                endDate: new Date('2024-12-31'),
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Bob',
		email: 'bob@company.com',
		projects: {
			create: [
				{
					name: 'This is the second project.',
          startDate: new Date('2024-12-17T03:24:00'),
          endDate: new Date('2024-12-21T03:24:00'),
					tasks: {
						create: [
							{
								description: 'Create RESTful API for the project.',
								status: 'STARTED',
                startDate: new Date('2024-12-17T03:24:00'),
                endDate: new Date('2024-12-17T03:24:00'),
							},
							{
								description: 'Create documentation for the API.',
								status: 'NOT_STARTED',
                startDate: new Date('2024-12-17T03:24:00'),
                endDate: new Date('2024-12-22T03:24:00'),
							},
						],
					},
				},
			],
		},
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const manager of managerData) {
		const createdManager = await prisma.manager.create({
			data: manager,
		});
		console.log(`Created manager with id: ${createdManager.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
