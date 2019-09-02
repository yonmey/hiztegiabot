import Telegraf from 'telegraf';
import cheerio from 'cheerio';
import request from 'request';

const bot = new Telegraf(process.env.BOT_TOKEN);

const getDefinitionNumber = def => {
  const m = def.match(/^\d+/);
  return m ? m[0] : '1';
};

const getDefinitionType = def => {
  const m = def.match(/\w+\./);
  return m ? `_${m[0]}_` : '';
};

const getDefinitions = def => {
  const m = def.match(/\w+\.\s(.+)/);
  return m ? m[1] : '';
};

const buildDefinition = (defNumber, defType, definitions) => {
  return `\`${defNumber} - \` ${defType}: ${definitions}`;
};

bot.start(ctx => ctx.replyWithMarkdown(`
  Bienvenid@ al diccionario Euskara <> Castellano\n- Para traducir una palabra de Euskara a Castellano: \`eus palabra\`\n- Para traducir una palabra de Casellano a Euskara: \`spa palabra\`
`))

bot.use(ctx => {
  if (ctx.message) {
    const query = ctx.message.text.toLowerCase();
    let lang = '';
    let wordReplacement = '';

    console.log(`${new Date()}\n${query}`);

    if (RegExp(/^eus\s/).test(query)) {
      lang = 'eu_es';
      wordReplacement = 'eus';
    } else if (RegExp(/^spa\s/).test(query)) {
      lang = 'es_eu';
      wordReplacement = 'spa';
    } else {
      return ctx.replyWithMarkdown('Nothing found');
    }

    const word = query.replace(`${wordReplacement} `, '');

    request(
      `https://hiztegiak.elhuyar.eus/${lang}/${word}`,
      (err, res, body) => {
        const $ = cheerio.load(body, {
          normalizeWhitespace: true
        });
        let results = [];

        $('p.lehena').each((i, def) => {
          const result = $(def)
            .text()
            .replace(/\s+/gm, ' ')
            .trim();

          const defNumber = getDefinitionNumber(result);
          const defType = getDefinitionType(result);
          const definitions = getDefinitions(result);
          const defEntry = buildDefinition(defNumber, defType, definitions);

          results.push(defEntry);
        });

        if (results.length) {
          return ctx.replyWithMarkdown(results.join('\n'));
        }

        return ctx.reply('Sin resultados');
      }
    );
  }
});

bot.startPolling();
