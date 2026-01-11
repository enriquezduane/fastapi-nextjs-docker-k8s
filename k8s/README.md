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
## alues

| Variable | Value |
|----------|-------|
| MYSQL_ROOT_PASSWORD | securepassword |
| MYSQL_DATABASE | testdb |
| MYSQL_USER | user |
| MYSQL_PASSWORD | securepassword |
| DB_CONNECTION_STRING | mysql+pymysql://user:securepassword@mysql:3306/testdb |
| ALLOWED_ORIGINS | http://167.71.202.208:30080,http://178.128.49.7:30080 |

## Nodes

- Control Plane: 167.71.202.208
- Worker Node: 178.128.49.7
