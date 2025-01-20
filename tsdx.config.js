const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    // Modify Rollup's plugins
    config.plugins = config.plugins.map(plugin => {
      if (plugin.name === 'replace') {
        return replace({
          ...plugin.options,
          preventAssignment: true, // Explicitly set this option
        });
      }
      return plugin;
    });
    return config;
  },
};
