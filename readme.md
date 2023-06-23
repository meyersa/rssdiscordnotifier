# RSS Discord Notifier 

Used in the ClearRP discord server to post Weazel News updates in the announcement channels. All variables are RSS feed independent or ENV so it could be used with different sources. Utilizes DiscordJS for pretty embeds and rss-parser to set player spawn regions

## Defaults for Weazel News 

- env rssURL = "https://weazelnewslive.com/index.php/feed/"
- env discordWebhook = "Find ya own discord webhook"
- env rssSleep = 5 minutes, set default but in milliseconds if you want to customize 
- env embedColor = 0xC50B22 

 Made by Meyers with love for Covert