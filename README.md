1. clone app from git hub
2. install node_modules with
```bash
  npm install 
```
3. clone file `.env.base_config` to `.env`

4. run docker to load postgreSQL
```bash
  docker-composer up -d
```
5. Start the app with 

```bash
  npm run start:dev
```
6. load seeds for basic examples

```bash
  http://localhost:3000/seeds
```
7. Your back end should be up. Enjoy the app 😊 ☕️

