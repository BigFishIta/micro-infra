# Template Service

Microservizio NestJS di base, con health check, ping, Swagger, metriche Prometheus e logger JSON.

## Prerequisiti

* Node.js >= 18
* npm
* Docker (per il container)

## Avvio in locale

1. Clona il repository e posizionati nella cartella del servizio:

   ```powershell
   cd services/template-service
   ```
2. Installa le dipendenze:

   ```powershell
   npm install
   ```
3. Avvia in modalità sviluppo con live‑reload:

   ```powershell
   npm run start:dev
   ```
4. I seguenti endpoint saranno disponibili su `http://localhost:3000`:

   * `GET /health` → `{ "status": "ok" }`
   * `GET /ping` → `{ "pong": true }`
   * `GET /metrics` → metriche Prometheus
   * Swagger UI: `http://localhost:3000/docs`

## Avvio con Docker

1. Dalla cartella del servizio, builda l'immagine:

   ```powershell
   docker build -t template-service .
   ```
2. Esegui il container:

   ```powershell
   docker run -d --name template-service -p 3000:3000 template-service
   ```
3. Verifica gli endpoint:

   ```powershell
   curl http://localhost:3000/health
   curl http://localhost:3000/ping
   curl http://localhost:3000/metrics
   ```
4. Per fermare e rimuovere il container:

   ```powershell
   docker stop template-service
   docker rm   template-service
   ```

## Variabili d'ambiente

Il servizio supporta un file `.env` (es. `.env.example`). Valori di default:

```
PORT=3000
NODE_ENV=development
```

Puoi personalizzare:

* `PORT`: porta su cui ascolta il server
* `NODE_ENV`: `development` o `production`

## Integrazione automatica in `docker-compose.yml`

Per integrare automaticamente il `template-service` nel tuo file `docker-compose.yml` principale, puoi aggiungere questa sezione sotto `services`:

```yaml
services:
  template-service:
    build:
      context: ./services/template-service
      dockerfile: Dockerfile
    container_name: template-service
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
    depends_on:
      - kong     # se usi API gateway
```

Con questa configurazione, eseguendo:

```bash
docker-compose up -d template-service
```

Docker Compose:

* **builda** automaticamente l'immagine dal contesto `./services/template-service`
* **nomina** il container `template-service`
* **esporta** la porta `3000`
* **passa** le variabili d'ambiente configurate

Se vuoi includere tutti i servizi in un unico comando, ometti il nome del servizio:

```bash
docker-compose up -d
```

Il template verrà ricostruito ogni volta in base alle modifiche nel codice, senza dover fare manualmente `docker build`.

🪵 Log JSON
Se usi `nestjs-pino`, i log saranno in JSON sullo stdout del container.
Puoi vederli con:

```powershell
docker logs -f template-service

