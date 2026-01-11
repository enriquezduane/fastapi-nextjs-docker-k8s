#!/bin/bash
# Delete all K8s resources
# Run from the k8s directory: ./delete.sh

echo "=== Deleting K8s Resources ==="

kubectl delete -f 10-argocd-application.yaml
kubectl delete -f 09-cluster-issuer.yaml
kubectl delete secret app-tls-secret --ignore-not-found
kubectl delete -f 08-ingress.yaml
kubectl delete -f 07-frontend-service.yaml
kubectl delete -f 06-frontend-deployment.yaml
kubectl delete -f 05-backend-service.yaml
kubectl delete -f 04-backend-deployment.yaml
kubectl delete -f 03-mysql-service.yaml
kubectl delete -f 02-mysql-statefulset.yaml
kubectl delete -f 01-mysql-pvc.yaml
kubectl delete -f 00-config-and-secrets.yaml

echo ""
echo "=== All resources deleted ==="
