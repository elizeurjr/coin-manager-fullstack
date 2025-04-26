# avoid routine error problem: error:0308010C:digital envelope routines::unsupported
FROM node:16-alpine AS builder

# folder where the build will go
WORKDIR /app

# copy files into the WORKDIR folder
COPY . .

# install project dependencies
RUN npm install && npm run build

FROM nginx:mainline-alpine

COPY nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html
