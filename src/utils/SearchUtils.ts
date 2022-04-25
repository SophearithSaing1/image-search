export const onGetErrorMessage = (query: string | null) => {
  if (query) {
    return `There's no result for ${query}!`;
  } else if (query === '') {
    return 'Please enter keywords!';
  } else {
    return 'Something went wrong, please try again later!';
  }
};

export const onSearch = async (query?: string) => {
  if (query === null || query === undefined) {
    return { error: onGetErrorMessage(null) };
  } else if (query.trim() === '') {
    return { error: onGetErrorMessage('') };
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}&per_page=12`,
    );

    const data = await response.json();

    if (data.results.length === 0) {
      return { error: onGetErrorMessage(null) };
    } else {
      return { results: data.results };
    }
  } catch (error: any) {
    console.log(error.message);
    return { error: onGetErrorMessage(null) };
  }
};
