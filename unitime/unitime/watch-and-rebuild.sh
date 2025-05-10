echo "Monitorizez modificarile in Green-Team... (CTRL + C pentru stop)"

while true; do
  inotifywait -r -e modify,create,delete ./src ./pom.xml

  echo "Modificare detectata. Rebuild automat..."

  if docker ps -a --format '{{.Names}}' | grep -Eq "green-team-container$"; then
    echo "Oprire container vechi..."
    docker rm -f green-team-container
  fi

  echo "Rebuild imagine green-team-app..."
  docker build -t green-team-app .

  echo "Pornesc container nou..."
  docker run -d -p 8080:8080 --name green-team-container -v green-team-data:/app green-team-app

  echo "Serverul actualizat ruleaza la http://localhost:8080"
done
