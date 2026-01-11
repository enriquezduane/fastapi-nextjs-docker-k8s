## Access

- **Frontend**: http://167.71.202.208:30080 or http://178.128.49.7:30080
- **Backend API**: http://167.71.202.208:30081 or http://178.128.49.7:30081

##  IMPORTANT: Rebuild Frontend Image

Frontend uses `NEXT_PUBLIC_API_URL` which is **baked at build time**. 

Need to rebuild the frontend image with the correct backend URL:

```bash
cd next-frontend

# Build with the K8s backend URL
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://167.71.202.208:30081 \
  -t enriquezduane/next-frontend:latest .

# Push to registry
docker push enriquezduane/next-frontend:latest
```
## Configuration

Configuration is managed using Kubernetes ConfigMaps and Secrets in `00-config-and-secrets.yaml`:

**ConfigMap (app-config)** - Non-sensitive configuration:
- MYSQL_DATABASE: testdb
- MYSQL_USER: user
- ALLOWED_ORIGINS: http://167.71.202.208:30080,http://178.128.49.7:30080

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
