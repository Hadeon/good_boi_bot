Just a good boi bot. 

In order for this to be functional there's a bot_secret_token which either needs to be added to a config.json as "bot_token" or placed in the client.login('#####') on the last line of good_boi.js.

Additionally in order for !fetch to work, a Giphy API Key must be included in the config.json as "giphy_key".

*** PERMISSIONS ***
MODIFY ROLES:
  -- Currently automatically assigns new users to a predefined role, will eventually add this and other options to variables in order to support this for other servers (not bothering to add this until I know of any other permissions that may be needed).
      - Need to more appropriately catch and log errors in the future as webhook errors would crash the bot.


*** FUTURE CONFIG CHANGES ***

- Store an array of words or phrases that Good Boi doesn't like (to be used in isRude function)
- Store the specific mad emote it will respond with
- Store the role to be assigned to newly joined users