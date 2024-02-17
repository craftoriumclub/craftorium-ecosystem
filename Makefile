deploy:
	ssh -o StrictHostKeyChecking=no deployer@${HOST} -p ${PORT} 'cd craftorium-ecosystem \
		&& git pull origin main \
		&& docker-compose up --build --remove-orphans -d'
