//Create a POST /sith endpoint

//And responds with a simplified yoda speak simply switching every 2 words
// {
//   "sith_text": "Is this example my sentence. Arrgh. Uhmm. For just fun. Err..err.err."
// }
// it keeps the capital positions and the end of sentences
// if a sentence doesn't contain even number of words, it leaves the last as is
// always puts (one or two) random things at the end of sentences
// if the input doesn't contain the text or its empty, respond with:
// {
//   "error": "Feed me some text you have to, padawan young you are. Hmmm."
// }

// just theorycrafting the solution::

// create exception for missing text.
// create an array or enum of random stuff to say
// bodyparsing + making all low cap
// splitting to 2Darray by .!? and then by " "
// looping L1 nested L2 arrays by 2 and swapping with index+1 (care about exceptions)
// merge L2 arrays into sentences
// making first character of each sentence high cap
// add some random enums hits at the end of the sentences
// post answer
