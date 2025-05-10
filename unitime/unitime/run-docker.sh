if docker ps -a --format '{{.Names}}' | grep -Eq "^green-team-container\$";
echo "Sterg containerul vechi green-team-container..."
docker rm -f green-team-container
fi

echo "Construiesc imaginea green-team-app..."
docker build -t green-team.app .

docker volume create green-team-data || true

echo "Pornesc containerul green-team-container..."
docker run -d -p 8080:8080 --name green-team-container -v green-team-data:/app green-team-app

echo "Serverul ruleaza la http://localhost:8080"
