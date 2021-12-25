install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
