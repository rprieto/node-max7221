HOST = 10.1.1.5
REQUIRED_FILES = package.json max7221.js lib examples

deploy:
	# the disable-copyfile flag excludes OSX resource forks from the tarball (._filename)
	tar --disable-copyfile  -cf - $(REQUIRED_FILES) | ssh pi@$(HOST) "mkdir -p node-max7221; cd node-max7221; tar xvf -"
