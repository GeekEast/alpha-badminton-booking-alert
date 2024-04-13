# stage 1: build the project
FROM --platform=amd64 predictivehireadmin/node-volta As build_stage 

WORKDIR /app

COPY pnpm-lock.yaml package*.json ./

RUN pnpm install --frozen-lockfile  # purpose: install the deps for building

COPY . .

RUN pnpm build   # genereate dist folder


# stage 2: start the project
FROM --platform=amd64 predictivehireadmin/node-volta
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# this will inject into online environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV AWS_NODEJS_CONNECTION_REUSE_ENABLED=1
ENV EXECUTION_ENV=FARGATE

# by default it's 2096MB for node14
# ENV NODE_OPTIONS=--max_old_space_size=4096


COPY pnpm-lock.yaml package*.json ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=build_stage /app/dist ./dist

ENTRYPOINT [ "node", "dist/src/main" ] 