# Usa la imagen oficial de Node.js versión 14
FROM node:19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto 5000 (ajústalo según tus necesidades)
EXPOSE 3000

# Comando para iniciar tu aplicación
CMD ["npm","start"]


