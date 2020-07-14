# GraphiQL 2.0.0 Recoil RFC

We needed a greater atomization of state reconciliation in our application.
With such high throughput events, the risk of unnecessary checks and re-renders grow.

`RecoilJS` provides an excellent pattern for highly atomic collections of state. It rewards a seperation of concerns and allows us to build powerful API interfaces.

In theory the atoms, selectors and libraries are not react dependent either, so these could be re-used for non-react implementations

## TODO

Much of this ecosystem is still in progress! Here is a layout of what's left

### Files

- [x] basic `uri` driven filesystem using recoil
- [x] detect language from extension
- [ ] selector for returning all files
- [ ] selector for returning files based on query

### Editors

- [x] store editor instances to be used by plugin interface
- [ ] hooks for custom instantiation pattern
- [ ] add session change event handlers
- [ ] hooks for session editors and non-session-based editors (create/add/edit a file, such as a schema)
- [ ] import, use custom settings

### Schemas

- [x] provisionally load a schema via HTTP with just uri (hook, selector, atom)
- [x] selector for returning memoized formats of schema based on uri and responseFormat
- [ ] use `File` to set/access the schema?
- [ ] support different loading mechanisms via settings
- [ ] integrate with `monaco-graphql`'s schema loading patterns
- [ ] import, use custom settings

### Settings

- [x] basic settings support
- [x] hook for loading and updating individual setting
- [x] hook for loading all settings as iterable
- [x] hook for loading/setting extension based on namespace (i.e. plugins)
- [ ] settings scopes - user, plugin, preset, etc
- [ ] merge/pre-load settings based on scopes
- [ ] plugin interface for async resolution of external settings
- [ ] seperate settings data and 'availableSettings' added by plugins?

### Tabs

- [ ] we should atomize tab state, and allow them to have/use their own atoms
- [ ] regions tabs by region key
- [ ] get/set current tab by region
- [ ] reordering of tabss

### Projects

- [ ] ugh this makes everything even more complicated, let's wait

### Plugins

- [ ] hook for loading/enabling plugins with provided settings on init
- [ ] register plugin/preset provided "settings"
- [ ] register tab components as settings
- [ ] hook to return all plugins
- [ ] hooks for enabling/disabling plugins in runtime?
