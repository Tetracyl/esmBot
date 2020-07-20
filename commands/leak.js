const magick = require("../build/Release/image.node");
const { promisify } = require("util");

exports.run = async (message) => {
  message.channel.sendTyping();
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide an image to make a Super Smash Bros. leak meme!`;
  const buffer = await promisify(magick.leak)(image.path, image.type.toUpperCase(), image.delay ? (100 / image.delay.split("/")[0]) * image.delay.split("/")[1] : 0);
  //const buffer = await gm(template).out("-background").out("white").out("-gravity").out("Center").out("(").out("-clone").out("0").out("(").out(image.path).out("-virtual-pixel").out("white").out("-resize").out("640x360!").rotate("white", 15).out(")").out("-geometry").out("+450-200").out("-composite").out(")").out("+swap").out("-composite").out("-alpha").out("remove").out("-alpha").out("off").bufferPromise(image.type, image.delay);
  return {
    file: buffer,
    name: `leak.${image.type}`
  };
};

exports.aliases = ["smash", "laxchris", "ssbu", "smashleak"];
exports.category = 5;
exports.help = "Creates a fake Smash leak thumbnail from an image";