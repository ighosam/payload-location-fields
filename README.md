# How to use

To use this plugin, first you have to install, the way I have been installing this file is through pnpm add file:{filepath}

## Configure the payload.config.ts

Now make this import: 
import { payloadLocationFieldsPlugin } from 'payload-location-fields'

Create a collection with any slugname of your choice with one field or any number of fields, remember the plugin will add the address fields.
You can also use collection name that exist for the plugin to add the address field to.
```
payloadLocationFieldsPlugin({
        collections:['you-collection-slugname'],
        
  
      }),
```

## Adding the database.

  Create a folder in the root of your application and call it data
  copy the database file and place it in the folder.

  create a .env file if it does not exist and then place this line in it: 
      ADDRESS_DB_PATH=path-to-your-database-file.





