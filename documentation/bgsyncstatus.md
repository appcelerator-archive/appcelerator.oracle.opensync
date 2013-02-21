# Oracle Opensync Module

## BGSyncStatus

The properties listed below are only accessible from a BGSyncStatus proxy that is returned from calling the `getSyncStatus` method of a BGSession proxy. 

## Properties

### endTime [long]
End time of last sync in milliseconds since the standard base time of January 1, 1970, 00:00:00 GMT. 0 if the sync is currently in progress or has yet run.

### lastError [string]
Exception object thrown during the last sync. null if last sync was successful or no sync has completed yet.

### prio [int]
Sync priority of current or last sync.

### progressStage [int]
Progress stage of sync if it is in progress, N/A otherwise.

### progressVal [int]
Progress value in % of sync if it is in progress, N/A otherwise.

### pubs [array]
Array of names of publications synced currently or during last sync.

### startTime [long]
Start time of current or last sync in milliseconds since the standard base time of January 1, 1970, 00:00:00 GMT. 0 if the sync has not yet started or the last sync time is not known.

## License

Copyright(c) 2011-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.
