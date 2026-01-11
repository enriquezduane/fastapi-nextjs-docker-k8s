## Access (via Nginx Ingress)

- **Frontend**: http://<node-ip>/
- **Backend Docs**: http://<node-ip>/docs
- **Backend API**: http://<node-ip>/api/*

Routes:
- `/` → Frontend (Next.js)
- `/docs`, `/redoc`, `/openapi.json` → Backend FastAPI docs
- `/api/*` → Backend API (rewrites to strip `/api` prefix, e.g., `/api/trip` → `/trip`)

##  IMPORTANT: Rebuild Frontend Image

Frontend uses `NEXT_PUBLIC_API_URL` which is **baked at build time**. 

Need to rebuild the frontend image with the correct backend URL (now using `/api` via ingress):

```bash
cd next-frontend

# Build with the Ingress-based backend URL
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://<node-ip>/api \
  -t enriquezduane/next-frontend:latest .

# Push to registry
docker push enriquezduane/next-frontend:latest
```
## Configuration

Configuration is managed using Kubernetes ConfigMaps and Secrets in `00-config-and-secrets.yaml`:

**ConfigMap (app-config)** - Non-sensitive configuration:
- MYSQL_DATABASE: testdb
- MYSQL_USER: user
- ALLOWED_ORIGINS: http://167.71.202.208,http://178.128.49.7

**Secret (app-secrets)** - Sensitive data:
- MYSQL_ROOT_PASSWORD: securepassword
- MYSQL_PASSWORD: securepassword
- DB_CONNECTION_STRING: mysql+pymysql://user:securepassword@mysql:3306/testdb

To update configuration, edit `00-config-and-secrets.yaml` and apply:
```bash
kubectl apply -f 00-config-and-secrets.yaml
kubectl rollout restart statefulset/mysql
kubectl rollout restart deployment/backend
```



## Nodes

- Control Plane: 167.71.202.208
- Worker Node: 178.128.49.7
