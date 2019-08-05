install:
	npm install

develop:
	npx webpack-dev-server

build:
	npm run-script build

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run
