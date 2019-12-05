module.exports = {
	"extends": "airbnb-base",
	"globals": {
		wx: true,
		App: true,
		Page: true,
		Component: true,
		Behavior: true,
		getApp: true,
	},
	"rules": {
		"class-methods-use-this": "off",
		"no-underscore-dangle": "off",
		"semi": [
			"error",
			"never",
		],
	},
}