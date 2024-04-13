FROM --platform=amd64 predictivehireadmin/node-volta

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD [ "pnpm","start" ]
