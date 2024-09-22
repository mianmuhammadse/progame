#!/bin/sh

npx prisma generate
npx prisma db seed

exec npm run dev
