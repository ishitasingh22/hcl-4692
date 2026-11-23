#Deployment of Springboot App

#Build 
#Serve Stage
FROM nginx:alpine
COPY nginx.conf/etc/nginx/conf.d/default.conf
COPY --from=build/app/dist/usr/share/nginx/html
EXPOSE 80