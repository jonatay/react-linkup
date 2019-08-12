var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
	name: "aReact Linkup",
	description: "react-linkup api & static page server.",
	script: " C:dev\react-linkup\binwww",
	env: {
		name: "DEBUG",
		value: "reactLinkup:*"
	}
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function() {
	svc.start();
});

svc.install();
