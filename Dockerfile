# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de Node.js
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer el puerto 4000
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "Server.js"]
