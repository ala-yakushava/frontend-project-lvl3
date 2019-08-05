install:
	npm install

start: 
	npx babel-node src/index.js

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage
