# medusa-plugin-feeds

This is a plugin for MedusaJS designed to create basic Shopping feeds for Google and Facebook. The project is just getting started and there's still lots of work to be done.

## Features

- Exposes custom endpoints to fetch feeds in XML or JSON format:
  - `/feed/xml`
  - `/feed/json`
  - `/admin/feed/xml`
  - `/admin/feed/json`

The last two endpoints are used internally by the admin panel to fetch the feeds.

## Usage

### Plugin Options

To enable Admin UI extensions, please add the below into your plugins object inside medusa-config.js

`{ resolve: `medusa-plugin-feeds`, options: { enableUI: true } },`

## Contributing

The project is in its early stages. Contributions are welcome 💚🙏.
