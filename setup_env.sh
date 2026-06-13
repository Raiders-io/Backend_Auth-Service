#!/bin/bash

create_env()
{
	if [ -f .env ]; then
		echo ".env file already exists. Do you want to overwrite it?"
		read -p "Continue? (Y/n): " confirm
		confirm=${confirm:-y} # Default to 'y' if no input is provided
		if ! [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
			echo "Setup cancelled."
			exit 1
		fi
	fi

	npm ci >/dev/null
	cp .env.example .env
	node ace generate:key
}

configure_postgres()
{
	echo "Choose a name for the PostgreSQL root user:"
	read DB_USER
	echo "Choose a password for the PostgreSQL root user (hidden):"
	read -s DB_PASSWORD
	sed -i "s|^\(DB_PASSWORD=\).*|\1${DB_PASSWORD}|" .env
	sed -i "s|^\(DB_USER=\).*|\1${DB_USER}|" .env
}

create_env
configure_postgres

echo "Environment setup complete. Please review the .env file and make any necessary adjustments."
