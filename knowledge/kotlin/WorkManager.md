`WorkManager` is a compatible, flexible and simple library for deferrable background work. WorkManager is the recommended solution for these use cases on Android.

WorkManager is part of [Android Jetpack](http://d.android.com/jetpack), and an [Architecture Component](http://d.android.com/arch) for background work that needs a combination of opportunistic and guaranteed execution. Opportunistic execution means that WorkManager will do your background work as soon as it can. Guaranteed execution means that WorkManager will take care of the logic to start your work under a variety of situations, even if you navigate away from your app.

Because of this, WorkManager is a good choice for tasks that must complete eventually.

Some examples of tasks that are a good use of WorkManager:

- Uploading logs
- Applying filters to images and saving the image
- Periodically syncing local data with the network
