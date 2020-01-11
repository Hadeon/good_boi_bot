Just a good boi bot. 

*** .ENV SETUP DIRECTIONS *** 

- bot_token
In order for this to be functional there's a bot_secret_token which either needs to be added to a .env as "bot_token" or placed in the client.login('#####') on the last line of good_boi.js. This needs to be setup with Discord's development console.

- giphy_key
Additionally in order for !fetch to work, a Giphy API Key must be included in the .env as "giphy_key".

- default_role
When new users join the server, they are automatically assigned a default role (which later will be configurable). You need to create that role within Discord and then enter it's name as the default_role.

- rude
The bot monitors messages for specific keywords. After 3 warnings, the user will be assigned the "Dog House" role (which will need to be created within Discord) which will be removed in 10 minutes. (Later will add options for the assigned rude_role as well as how long the timer should last). At the moment, simply create a "rude" : [ ] array with a list of words the bot should identify as rude. This can be left empty if desired.

*** PERMISSIONS ***
MODIFY ROLES:
  -- Currently automatically assigns new users to a predefined role, will eventually add this and other options to variables in order to support this for other servers (not bothering to add this until I know of any other permissions that may be needed).
      - Need to more appropriately catch and log errors in the future as webhook errors would crash the bot.


*** FUTURE .ENV CHANGES ***

- Need to set up locally for .env, as this is what Heroku will be using instead of .config