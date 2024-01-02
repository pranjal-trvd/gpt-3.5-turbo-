const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: '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' });
const multer = require('multer');
const upload = multer().single('image');

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": `summarise this ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const responseText = completion.choices[0].message.content;
    // Send the completion back to the client
    return res.status(200).send({
      success: true,
      message: "Chat completion generated successfully",
      completion: responseText
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": `write a detail paragraph about ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });
    const responseText = completion.choices[0].message.content;
    // Send the completion back to the client
    return res.status(200).send({
      success: true,
      message: "Chat completion generated successfully",
      completion: responseText
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": `${text}` }],
      max_tokens: 300,
      temperature: 0.7,
    });
    const responseText = completion.choices[0].message.content;
    // Send the completion back to the client
    return res.status(200).send({
      success: true,
      message: "Chat completion generated successfully",
      completion: responseText
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": `/* convert these instructions into javascript code \n${text}` }],
      max_tokens: 400,
      temperature: 0.25,
    });
    const responseText = completion.choices[0].message.content;
    // Send the completion back to the client
    return res.status(200).send({
      success: true,
      message: "Chat completion generated successfully",
      completion: responseText
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    return res.status(200).send({
      success: true,
      message: "Image generated successfully",
      image_url
    });
    // const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
    // console.log(image.data);
    // return res.status(200).send(
    //   image.data,
    // )
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.visionImageController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Error uploading file' });
      } else if (err) {
        return res.status(500).json({ success: false, message: 'Error uploading file' });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No files were uploaded.' });
      }

      const buffer = req.file.buffer;
      const base64String = buffer.toString('base64');
      const text = req.body.text;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `${text}`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64String}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });

      const responseText = completion.choices[0].message.content;
      // Send the completion back to the client
      return res.status(200).send({
        success: true,
        message: "Chat completion generated successfully",
        completion: responseText
      });

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};