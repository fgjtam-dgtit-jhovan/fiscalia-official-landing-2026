FROM node:18-alpine

# Instalar OpenSSL - asegurar que se instala correctamente
RUN apk update && apk add --no-cache openssl

# Verificar instalación (esto fallará si no se instaló)
RUN openssl version || echo "OpenSSL no instalado"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]