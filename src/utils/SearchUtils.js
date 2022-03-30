export const onShowError = (query) => {
  if (query) {
    return `There's no result for ${query}!`;
  } else if (query === '') {
    return 'Please enter keywords!';
  } else {
    return 'Something went wrong, please try again later!';
  }
};

export const onSearch = async (query) => {
  if (query === null || query === undefined) {
    return { error: onShowError() };
  } else if (query.trim() === '') {
    return { error: onShowError('') };
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}&per_page=12`,
    );

    const data = await response.json();

    if (data.results.length === 0) {
      return { error: onShowError() };
    } else {
      return { results: data.results };
    }
  } catch (error) {
    console.log(error.message);
    return { error: onShowError() };
  }
};
