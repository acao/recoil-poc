# GraphiQL 2.0.0 Recoil RFC

We needed a greater atomization of state reconciliation in our application.
With such high throughput events, the risk of unnecessary checks and re-renders grow.

`RecoilJS` provides an excellent pattern for highly atomic collections of state. It rewards a seperation of concerns and allows us to build powerful API interfaces

##
