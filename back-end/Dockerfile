# fetch base image of Node
FROM node:19-alpine

# use this folder as the working directory (like a CD command)
WORKDIR /usr/src

# copy the current directory to the workdir
COPY . .

# "expose" port 5000
EXPOSE 5000

# download dependencies
RUN npm install && npm run build

# start the server
CMD ["npm", "run", "start"]
