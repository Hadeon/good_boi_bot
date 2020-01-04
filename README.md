Just a good boi bot. 

In order for this to be functional there's a bot_secret_token which either needs to be added to a .env as "bot_token" or placed in the client.login('#####') on the last line of good_boi.js.

Additionally in order for !fetch to work, a Giphy API Key must be included in the .env as "giphy_key".

*** PERMISSIONS ***
MODIFY ROLES:
  -- Currently automatically assigns new users to a predefined role, will eventually add this and other options to variables in order to support this for other servers (not bothering to add this until I know of any other permissions that may be needed).
      - Need to more appropriately catch and log errors in the future as webhook errors would crash the bot.


*** FUTURE .ENV CHANGES ***

- Need to set up locally for .env, as this is what Heroku will be using instead of .config