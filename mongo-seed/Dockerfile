FROM mongo

COPY initUsers.json /initUsers.json
COPY initCars.json /initCars.json
ENTRYPOINT mongoimport --host mongo --db test --collection cars --drop --file /initCars.json --jsonArray
CMD mongoimport --host mongo --db test --collection users --drop --file /initUsers.json --jsonArray
