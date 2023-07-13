Proto DataStore is type safe and efficient but requires configuration and setup. If your app data is simple enough that it can be saved in key-value pairs, then Preferences DataStore is a better choice since it is much easier to set up.

Proto DataStore defines the schema using [Protocol buffers](https://developers.google.com/protocol-buffers). Using Protocol buffers, or Protobufs, lets you **persist strongly typed data**. Protobufs are faster, smaller, simpler, and less ambiguous than XML and other similar data formats.
