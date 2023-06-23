let Parser = require('rss-parser');
let parser = new Parser();
const { EmbedBuilder, WebhookClient } = require('discord.js');

const rssURL = process.env.rssURL;
const discordWebhook = process.env.discordWebhook;
const rssSleep = process.env.rssSleep ?? 60000 * 5;
const embedColor = process.env.embedColor;

function main() {

    console.log("Creating WebhookClient");
    try {
        const webhookClient = new WebhookClient({ url: discordWebhook });
    } catch (e) {
        console.error(`Failed to create WebhookClient\n${e}`);
    };

    console.log("Webhook created");

    console.log("Starting poller");
    setInterval(async () => {

        // Async call to the parseurl 
        let feed = await parser.parseURL(rssURL).catch((e) => console.error(`Failed to parse RSS URL\n${e}`));
        let embedsToSend = [];

        // Check to see if it was within the last rsssleep period 
        feed.items.forEach((item) => {
            if (((Date.now() - Date.parse(item.pubDate))) < rssSleep) {
                console.log(`Found new story ${item.title}`);

                // Prettify and send to discord as webhook 
                embedsToSend.push(new EmbedBuilder()
                    .setAuthor({
                        name: item.creator
                    })
                    .setColor(embedColor)
                    .setDescription(item.content)
                    .setThumbnail(feed.image.url)
                    .setURL(item.guid)
                    .setFooter({
                        text: feed.link
                    })
                    .setTitle(item.title)).catch((e) => console.error(`Failed to create Embed\n${e}`));

            };
        });
        if (embedsToSend.length > 0) {
            embedsToSend.forEach(async (embed) => {
                await webhookClient.send({
                    username: feed.title,
                    avatarURL: feed.image.url,
                    embeds: [embed],
                }).catch((e) => console.error(`Failed to send Embed\n${e}`));
            })
            console.log("Sent Embed");

        };
        console.log("End iteration");

    }, rssSleep);
};

main();