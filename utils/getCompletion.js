const getCompletion = async (openai, model, messages) => {
  const completion = await openai.createChatCompletion({
    model,
    messages,
    max_tokens: 4000,
    top_p: 0.6,
  });
  
  return completion.data.choices[0].message.content;
};

export default getCompletion;