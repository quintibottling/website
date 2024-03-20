import { promises as fsPromises } from "fs";

const ROOT_FOLDER = "./pages";

let labels = null;
async function getConfig() {
  const json = await fs.readFile("./data/config-data.json", "utf8");
  labels = JSON.parse(json);
}

await getConfig();
const { translations, defaultLocale, locales } = labels;
const langs = locales.filter((l) => l != defaultLocale);

async function replaceInFile(sourceFile, destFile, locale, defaultLocale) {
  try {
    const contents = await fsPromises.readFile(sourceFile, "utf-8");
    const re = new RegExp(`"${defaultLocale}"`, "g");
    let replaced = contents.replace(re, `'${locale}'`);
    await fsPromises.writeFile(destFile, replaced);
  } catch (err) {
    console.error(err);
  }
}

function getTranslation(source, lang) {
  const chunks = source.split("/");
  const file = chunks.slice(-1)[0];
  const folders = chunks.slice(0, chunks.length - 1);

  const translatedPath = folders.reduce((str, name) => {
    const translation = translations[name] ? translations[name][lang] : name;
    return (str += translation + "/");
  }, "");

  const fileName = file.replace(".js", "");
  const translatedFile = translations[fileName]
    ? translations[fileName][lang]
    : fileName;
  return { folder: translatedPath, file: `${translatedFile}.js`, source };
}

await cd(ROOT_FOLDER);
const pwd = await $`pwd`;
await $`echo Current folder is ${pwd}.`;

within(async () => {
  for (let lang of langs) {
    console.info(
      chalk.blue("GENERATING ROUTES FOR "),
      chalk.green(lang.toUpperCase())
    );

    console.info(chalk.blue("Removing previous " + lang + " folder..."));
    try {
      await $`rm -fr ${lang}`;
    } catch (error) {
      console.info(error);
    }

    let allfiles = await glob([
      "**/*",
      "!api",
      `!${lang}/*`,
      "!_app.js",
      "!_document.js",
      "!404.js",
    ]);
    console.info("allfiles", allfiles);

    const destinations = allfiles.map((f) => getTranslation(f, lang));
    console.info("destinations", destinations);

    try {
      console.info(chalk.blue("Generating new " + lang + " folder..."));
      try {
        await $`mkdir ${lang}`;
      } catch (error) {
        //ignore
      }

      console.info(chalk.blue("Creating translated folders..."));
      const folderPromises = destinations.map(({ folder }) => {
        return $`mkdir -p ${lang}/${folder}`;
      });
      await Promise.all(folderPromises);

      console.info(chalk.blue("Generating page files..."));
      const generateFiles = destinations.map((destination) => {
        const { folder, file, source } = destination;
        const dest = `${lang}/${folder}/${file}`;

        return replaceInFile(source, dest, lang, defaultLocale);
      });
      await Promise.all(generateFiles);
    } catch (error) {
      console.info(error);
    }
    console.info(chalk.blue("Done!"));
  }
  console.info(chalk.blue("The End"));
});
