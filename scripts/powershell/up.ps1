Param(
  [Switch]$Build
)

# Se passato il flag -Build, ricostruisce le immagini
if ($Build) {
  Write-Host "Building images..."
  docker-compose build
}

Write-Host "Starting all services in detached mode..."
docker-compose up -d
