FROM node:lts

# Set working directory
WORKDIR /app

# Install global npm packages
RUN npm install -g @angular/cli

# Copy and install local npm packages
COPY package.json* package-lock.json* ./
RUN npm install

# Copy the remaining source code
COPY . .

# CMD ["npm", "start"]