# Hiztegiabot 🤖 📖
A Telegram bot who translates from Spanish to Basque (and viceversa)

----

### How to use it?
The bot will answer with the instructions when you write `/start`.

To translate a text from Spanish to Basque use:

`spa word_to_translate`

To translate a text from Basque to Spanish use:

`eus word_to_translate`

### How does it translates the words?
The bot parses the `Elhuyar` website to find the results. The translation sense depends on the first keyword (`eus` or `spa`).

##### Used libraries
- [telegraf](https://github.com/telegraf/telegraf)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [request](https://github.com/request/request)