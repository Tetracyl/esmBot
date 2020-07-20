const magick = require("../build/Release/image.node");
const { promisify } = require("util");

exports.run = async (message) => {
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide an image to add some magik!`;
  const processMessage = await message.channel.createMessage("<a:processing:479351417102925854> Processing... This might take a while");
  const buffer = await promisify(magick.magik)(image.path, image.type.toUpperCase(), image.delay ? (100 / image.delay.split("/")[0]) * image.delay.split("/")[1] : 0);
  await processMessage.delete();
  return {
    file: buffer,
    name: `magik.${image.type}`
  };
};

exports.aliases = ["imagemagic", "imagemagick", "imagemagik", "magic", "magick", "cas", "liquid"];
exports.category = 5;
exports.help = "Adds a content aware scale effect to an image";