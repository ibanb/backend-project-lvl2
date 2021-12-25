install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
