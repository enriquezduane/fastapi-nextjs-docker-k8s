#!/bin/bash
# Simple K8s deployment script
# Run from the k8s directory: ./deploy.sh

echo "=== Deploying to Kubernetes ==="

# Apply all manifests in order
echo "0. Creating ConfigMaps and Secrets..."
kubectl apply -f 00-config-and-secrets.yaml

echo "1. Creating MySQL PVC..."
kubectl apply -f 01-mysql-pvc.yaml

echo "2. Creating MySQL StatefulSet..."
kubectl apply -f 02-mysql-statefulset.yaml

echo "3. Creating MySQL Service..."
kubectl apply -f 03-mysql-service.yaml

echo "Waiting 30s for MySQL to initialize..."
sleep 30

echo "4. Creating Backend Deployment..."
kubectl apply -f 04-backend-deployment.yaml

echo "5. Creating Backend Service..."
kubectl apply -f 05-backend-service.yaml

echo "6. Creating Frontend Deployment..."
kubectl apply -f 06-frontend-deployment.yaml

echo "7. Creating Frontend Service..."
kubectl apply -f 07-frontend-service.yaml

echo "8. Creating Ingress..."
kubectl apply -f 08-ingress.yaml

echo "9. Creating ClusterIssuer for TLS..."
kubectl apply -f 09-cluster-issuer.yaml

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Check status with:"
echo "  kubectl get pods"
echo "  kubectl get services"
echo "  kubectl get ingress"
echo "  kubectl get certificate"
echo ""
echo "Access your app via Ingress:"
echo "  Frontend:     https://167.71.202.208.sslip.io/"
echo "  Backend Docs: https://167.71.202.208.sslip.io/docs"
